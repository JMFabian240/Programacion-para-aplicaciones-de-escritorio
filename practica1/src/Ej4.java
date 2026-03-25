public class Ej4 {
    public void ejecutarProceso() throws ErrorDeProcesamientoException {
        throw new ErrorDeProcesamientoException("Temo decirle que hubo un fallo al ejecutar el proceso.");
    }

    public static void main(String[] args) {
        Ej4 instancia = new Ej4();

        try {
            instancia.ejecutarProceso();
        } catch (ErrorDeProcesamientoException e) {
            System.out.println("Error controlado: " + e.getMessage());
        }
    }
}