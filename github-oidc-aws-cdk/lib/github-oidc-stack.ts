import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';

const GITHUB_DOMAIN = 'token.actions.githubusercontent.com';
const CLIENT_ID = 'sts.amazonaws.com'

export class GithubOidcStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const githubProvider = new iam.OpenIdConnectProvider(this, 'OpenIdGitHubProvider', {
      url: `https://${GITHUB_DOMAIN}`,
      clientIds: [CLIENT_ID],
    });

    const allowedRepositories = [
      'repo:tericcabrel/blog-tutorials:*',
      'repo:tericcabrel/snipcode:main'
    ];

    const conditions: iam.Conditions = {
      StringEquals: {
        [`${GITHUB_DOMAIN}:aud`]: CLIENT_ID,
      },
      StringLike: {
        [`${GITHUB_DOMAIN}:sub`]: allowedRepositories,
      },
    };

    /*const githubActionsRole = new iam.Role(this, 'GitHubActionsRole', {
      roleName: 'gitHub-actions-role',
      description: 'This role is used via GitHub Actions to perform any actions to any AWS services',
      assumedBy: new iam.WebIdentityPrincipal(
        githubProvider.openIdConnectProviderArn,
        conditions,
      ),
      maxSessionDuration: cdk.Duration.hours(1),
      managedPolicies: [
        iam.ManagedPolicy.fromAwsManagedPolicyName('AdministratorAccess'),
      ],
    });*/

    const githubActionsRole = new iam.Role(this, 'GitHubActionsRole', {
      roleName: 'github-actions-role',
      description: 'This role is used via GitHub Actions to push a Docker image to the Amazon ECR',
      maxSessionDuration: cdk.Duration.hours(1),
      assumedBy: new iam.WebIdentityPrincipal(
        githubProvider.openIdConnectProviderArn,
        conditions,
      ),
      inlinePolicies: {
        ECRActionPolicy: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              actions: [
                'ecr:BatchGetImage',
                'ecr:BatchCheckLayerAvailability',
                'ecr:CompleteLayerUpload',
                'ecr:GetDownloadUrlForLayer',
                'ecr:InitiateLayerUpload',
                'ecr:PutImage',
                'ecr:UploadLayerPart',
              ],
              resources: ['*'],
              effect: iam.Effect.ALLOW,
            }),
          ],
        }),
        ECRAuthPolicy: new iam.PolicyDocument({
          statements: [
            new iam.PolicyStatement({
              actions: ['ecr:GetAuthorizationToken'],
              resources: ['*'],
              effect: iam.Effect.ALLOW,
            }),
          ],
        }),
      },
    });

    new cdk.CfnOutput(this, 'GitHubActionsRoleOutputARN', {
      value: githubActionsRole.roleArn
    });
  }
}
