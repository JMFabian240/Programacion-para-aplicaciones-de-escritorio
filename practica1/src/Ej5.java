public class Ej5 {
    public void ejecutarProceso() throws ErrorDeProcesamientoException {
        throw new ErrorDeProcesamientoException("Que es lo que ocurre?,Tambien tenemos un fallo al ejecutar el proceso");
    }

    public static void main(String[] args) {
        Ej5 instancia = null;

        try {
            instancia.ejecutarProceso();
        } catch (Exception e) {
            System.out.println("Excepción general capturada: " + e.getClass().getSimpleName());
            System.out.println("Mensaje: " + e.getMessage());
        }
    }
}