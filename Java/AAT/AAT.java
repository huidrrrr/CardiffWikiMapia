public class AAT {
    public static void main(String[] args) {
        String str ="aabbcc.";
        str=str.replaceAll("aa", "bb");
        str=str.substring(0, str.length()-1);
        System.out.println(str);
        
    }
    
}