import java.util.HashMap;
import java.util.Map;
import java.util.Random;
import java.util.Scanner;
import java.io.File;
import java.lang.StringBuffer;
import java.util.Random;
public class Loginsys {
    public static void main(String args[]){
        // start 
        Map<String, String> users = new HashMap<String, String>();
        try {
            Scanner scan = new Scanner(new File("users.txt"));
            while (scan.hasNext()) {
                String username = scan.next();
                String password = scan.next();
                users.put(username, password);

            }
        } catch (Exception e) {
            System.out.println(e);
        }
        Scanner stdin = new Scanner(System.in);
        System.out.println("Enter username: ");
        String user = stdin.nextLine();
        System.out.println("Enter password: ");
        String pass = stdin.nextLine();
        if (users.containsKey(user) && users.get(user).equals(pass)) {
            System.out.println("logged in successfully");
        } else if (users.containsKey(user))
            System.out.println("Incorrect password!");
        else {
            System.out.println("User does not exist!");
        }
    }
}
