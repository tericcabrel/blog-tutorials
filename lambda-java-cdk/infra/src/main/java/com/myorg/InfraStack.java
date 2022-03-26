package com.myorg;

import static java.util.Collections.singletonList;
import static software.amazon.awscdk.BundlingOutput.ARCHIVED;

import java.util.Arrays;
import java.util.List;
import software.amazon.awscdk.CfnOutput;
import software.amazon.awscdk.CfnOutputProps;
import software.amazon.awscdk.services.apigatewayv2.alpha.AddRoutesOptions;
import software.amazon.awscdk.services.apigatewayv2.alpha.HttpApi;
import software.amazon.awscdk.services.apigatewayv2.alpha.HttpMethod;
import software.amazon.awscdk.services.apigatewayv2.alpha.PayloadFormatVersion;
import software.amazon.awscdk.services.apigatewayv2.integrations.alpha.HttpLambdaIntegration;
import software.amazon.awscdk.services.apigatewayv2.integrations.alpha.HttpLambdaIntegrationProps;
import software.constructs.Construct;
import software.amazon.awscdk.BundlingOptions;
import software.amazon.awscdk.DockerVolume;
import software.amazon.awscdk.Duration;
import software.amazon.awscdk.Stack;
import software.amazon.awscdk.StackProps;
import software.amazon.awscdk.services.lambda.Code;
import software.amazon.awscdk.services.lambda.Function;
import software.amazon.awscdk.services.lambda.FunctionProps;
import software.amazon.awscdk.services.lambda.Runtime;
import software.amazon.awscdk.services.logs.RetentionDays;
import software.amazon.awscdk.services.s3.assets.AssetOptions;

public class InfraStack extends Stack {
    public InfraStack(final Construct parent, final String id) {
        this(parent, id, null);
    }

    public InfraStack(final Construct parent, final String id, final StackProps props) {
        super(parent, id, props);

        List<String> lambdaFunctionPackagingInstructions = Arrays.asList(
            "/bin/sh",
            "-c",
            "cd bmi-calculator " +
                "&& mvn clean install " +
                "&& cp /asset-input/bmi-calculator/target/bmicalculator.jar /asset-output/"
        );

        BundlingOptions.Builder builderOptions = BundlingOptions.builder()
            .command(lambdaFunctionPackagingInstructions)
            .image(Runtime.JAVA_11.getBundlingImage())
            .volumes(singletonList(
                // Mount local .m2 repo to avoid download all the dependencies again inside the container
                DockerVolume.builder()
                    .hostPath(System.getProperty("user.home") + "/.m2/")
                    .containerPath("/root/.m2/")
                    .build()
            ))
            .user("root")
            .outputType(ARCHIVED);

        Function bmiCalculatorFunction = new Function(this, "bmi-calculator", FunctionProps.builder()
            .functionName("bmi-calculator")
            .runtime(Runtime.JAVA_11)
            .code(Code.fromAsset("../", AssetOptions.builder().bundling(
                builderOptions.command(
                    lambdaFunctionPackagingInstructions
                ).build()
            ).build()
            ))
            .handler("com.tericcabrel.App")
            .memorySize(1024)
            .timeout(Duration.seconds(10))
            .logRetention(RetentionDays.ONE_WEEK)
            .build());

        HttpApi httpApi = new HttpApi(this, "HttpApi");

        HttpLambdaIntegration httpLambdaIntegration = new HttpLambdaIntegration(
            "this",
            bmiCalculatorFunction,
            HttpLambdaIntegrationProps.builder()
                .payloadFormatVersion(PayloadFormatVersion.VERSION_2_0)
                .build()
        );

        httpApi.addRoutes(AddRoutesOptions.builder()
            .path("/calculate")
            .methods(singletonList(HttpMethod.POST))
            .integration(httpLambdaIntegration)
            .build()
        );

        new CfnOutput(this, "HttApi", CfnOutputProps.builder()
            .description("HTTP API URL")
            .value(httpApi.getApiEndpoint())
            .build());

    }
}
