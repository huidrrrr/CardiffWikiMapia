public class Maintest {
    public static void main( String args[]){
        PhoneBook pb = new PhoneBook();
        pb.add("bob", "123123");
        pb.add("jack", "111111");
        System.out.println(pb);
        System.out.println(pb.numberFor("bob"));

        
    } 
}
