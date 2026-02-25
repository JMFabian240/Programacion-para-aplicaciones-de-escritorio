import java.util.Date;

public class GeometricObject {
    private String color;
    private boolean filled;
    Date dateCreate;

    GeometricObject(){
        this.dateCreate = new Date();
    }

    GeometricObject( String color, boolean filled) {
        this.color = color;
        this.filled = filled;
        this.dateCreate = new Date();
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public boolean isFilled() {
        return filled;
    }

    public void setFilled(boolean filled) {
        this.filled = filled;
    }

    public Date getDateCreate() {
        return dateCreate;
    }

    @Override
    public String toString() {
        return "GeometricObject{" +
                "color : " + color + '\'' +
                ", filled=" + filled +
                ", dateCreate=" + dateCreate +
                '}';
    }
}
