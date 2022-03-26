package com.myorg;

import software.amazon.awscdk.App;

public final class BmiCalculatorApp {
    public static void main(final String[] args) {
        App app = new App();

        new BmiCalculatorStack(app, "BmiCalculatorStack");

        app.synth();
    }
}
