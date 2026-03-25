import java.util.Scanner;

public class ContarVotos {
    public static void main(String[] args) {
        Scanner teclado = new Scanner(System.in);

        int numCandidatos = 5;
        int[] votosCandidatos = new int[numCandidatos];
        int totalVotos = 0;
        int voto;

        System.out.println( "\nSistema de Conteo de Votos\n" );
        System.out.println( "Ingrese el número del candidato (1 a " + numCandidatos + ")" );
        System.out.println( "Para finalizar, ingrese 0" );

        do {
            System.out.print("Voto para el candidato: ");
            voto = teclado.nextInt();

            if (voto > 0 && voto <= numCandidatos) {
                votosCandidatos[voto - 1]++;
                totalVotos++;
            } else if (voto != 0) {
                System.out.println("Voto nulo o candidato no existe.");
            }

        } while (voto != 0);

        System.out.println("\n Resultados Finales \n");
        System.out.println("Total de votos válidos: " + totalVotos);

        if (totalVotos > 0) {
            for (int i = 0; i < numCandidatos; i++) {
                double porcentaje = (votosCandidatos[i] * 100.0) / totalVotos;
                double porcentajeRedondeado = Math.round( porcentaje * 100.0) / 100.0;
                System.out.println("Candidato " + (i + 1) +":"  + "\t" + votosCandidatos[i]  + " votos " + "\t" + "(" + porcentajeRedondeado + "%" + ")");
            }
        } else {
            System.out.println("No se registraron votos.");
        }

        teclado.close();
    }
}
