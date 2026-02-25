import java.util.Date;

public class Rectangle extends GeometricObject{
    private double width;
    private double heigth;

    Rectangle(){
        super(dateCreate);
        this.width = 2.0;
        this.heigth = 1.0;
        this.dateCreate = new Date();
    }

    Rectangle(double width, double heigth){
        this.width = width;
        this.heigth = heigth;
    }

    Rectangle(double width, double heigth, String color, boolean filled){
        super(color, filled, dateCreate);
        this.width = width;
        this.heigth = heigth;
        this.color = color;
        this.filled = filled;
    }

    public double getWidth() {
        return width;
    }

    public void setWidth(double width) {
        this.width = width;
    }

    public double getHeigth() {
        return heigth;
    }

    public void setHeigth(double heigth) {
        this.heigth = heigth;
    }

    public double getArea(){
        return width * heigth;
    }

    public  double getPerimeter(){
        return ( width * 2 ) * ( heigth * 2 );
    }
}

