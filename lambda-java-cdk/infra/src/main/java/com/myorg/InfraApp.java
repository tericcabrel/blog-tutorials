package com.myorg;

import software.amazon.awscdk.App;

public final class InfraApp {
    public static void main(final String[] args) {
        App app = new App();

        new InfraStack(app, "InfraStack");

        app.synth();
    }
}
