import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;

public class App {
    public static void main(String[] args) throws IOException {
        FileInputStream in = null;
        FileOutputStream out = null;

        try {
            in = new FileInputStream("MisdatosUV.txt");
            out = new FileOutputStream ("bytprueba2.txt");

            int c;
            while ( ( c = in.read() ) != -1 ){
                out.write( c );
            }
        }
        catch ( IOException ex ){
            System.out.println( "ERROR : No fue posible instanciar objeto ");
            System.out.println( ex.getMessage() );
            ex.getMessage();
            ex.printStackTrace();
        }
        finally {
            if ( in != null ) in.close();

            if ( out != null ) out.close();
        }
    }
}
