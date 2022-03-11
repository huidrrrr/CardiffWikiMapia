import java.util.ArrayList;

public class ListTest {
    public static void main(String[] args) {
        ArrayList<String> printerQ= new ArrayList<String>();
        printerQ.add("file1.txt");
        printerQ.add("BRP.doc");
        printerQ.add("file2.xcl");
        System.out.println(printerQ);
        printerQ.set(1, "aaa");
        System.out.println(printerQ);
        printerQ.add(0,"step3");
        System.out.println(printerQ);
        printerQ.remove(2);
        System.out.println(printerQ);
        System.out.println("item at index 1: "+printerQ.get(1));
    }
}
