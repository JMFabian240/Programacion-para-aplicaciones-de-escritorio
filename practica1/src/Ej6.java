public class Ej6 {

    public void metodoA() throws ErrorDeProcesamientoException {
        throw new ErrorDeProcesamientoException("El Método A falló desde su origen.");
    }
    public void metodoB() throws Exception {
        try {
            metodoA();
        } catch (ErrorDeProcesamientoException e) {
            throw new Exception("El Método B falló al intentar ejecutar el Método A.", e);
        }
    }
    public static void main(String[] args) {
        Ej6 objeto = new Ej6();

        try {
            objeto.metodoB();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}