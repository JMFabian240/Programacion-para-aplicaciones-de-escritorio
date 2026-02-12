public class CalcAverage {

    public double avgFirstN(int N) {
        int sum = 0;
        for (int k = 1; k <= N; k++)
            sum += k;
        return sum/N;         // What if N is 0?
    } // avgFirstN()

    public static void main(String args[]) {
        CalcAverage ca = new CalcAverage();
        System.out.println( "AVG + " + ca.avgFirstN(0) );
    }//main
}//CalcAverage

