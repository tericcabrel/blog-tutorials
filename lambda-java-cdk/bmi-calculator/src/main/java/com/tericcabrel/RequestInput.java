package com.tericcabrel;

public class RequestInput {

  private double height;
  private double weight;

  public double getHeight() {
    return height;
  }

  public void setHeight(double height) {
    this.height = height;
  }

  public double getWeight() {
    return weight;
  }

  public void setWeight(double weight) {
    this.weight = weight;
  }

  @Override
  public String toString() {
    return "RequestInput{" +
        "height=" + height +
        ", weight=" + weight +
        '}';
  }
}
