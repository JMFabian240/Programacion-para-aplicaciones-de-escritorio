public class Circle extends GeometricObject {

    private double radius;

    Circle(){
        this.radius = 1.0;
    }

    Circle( double radius) {
        this.radius = radius;
    }

    Circle(double radius, String color, boolean filled) {
        super(color, filled );
        this.radius = radius;
        this.color = color;
        this.filled = filled;
    }

    public double getRadius() {
        return radius;
    }

    public void setRadius(double radius) {
        this.radius = radius;
    }

    public double getArea(){
        double pi = 3.1416;
        double area = pi * ( Math.pow(radius,2));
        return  area;
    }

    public double getPerimeter(){
        double perimetro = 10;
        return perimetro;
    }

    public double getDiametro(){
        return radius * 2;
    }

    public void printCircle(){

    }
}
