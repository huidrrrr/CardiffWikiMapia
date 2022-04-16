import java.io.File; // Import the File class
import java.io.FileNotFoundException; // Import this class to handle errors
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner; // Import the Scanner class to read text files

public class Filereader {
    public static void inputFilereader(String str) {

        // List<String> constraintlst = constraintFilereader("./google-10000-english-no-swears.txt.txt");
        List<String> constraintlst = constraintFilereader("./constraint.txt");
        try {
            File myObj = new File(str);
            Scanner myReader = new Scanner(myObj);
            while (myReader.hasNextLine()) {
                String data = myReader.nextLine();
                // get each line into lst
                if (!data.isEmpty()) {
                    List<String> resList = new ArrayList<String>();
                    String[] eachLine = data.split(" ");
                    // String[] to list<String>
                    List<String> eachLinelst = Arrays.asList(eachLine);
                    for (String inputEle : eachLinelst) {
                        // check if string has . at the end
                        // it does
                        if (inputEle.endsWith(".")) {
                            String inputEleRemoveEnd = inputEle.substring(0, inputEle.length() - 1);
                            String inputEleLow = inputEleRemoveEnd.toLowerCase();
                            for (String constraintEle : constraintlst) {
                                if (inputEleLow.equals(constraintEle)) {
                                    resList.add(inputEle);
                                }

                            }
                        }
                        // it does not
                        else {
                            String inputEleLow = inputEle.toLowerCase();
                            for (String constraintEle : constraintlst) {
                                if (inputEleLow.equals(constraintEle)) {
                                    resList.add(inputEle);
                                }

                            }

                        }

                    }

                    System.out.println(resList.toString());
                }

            }

            myReader.close();
        } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }

    }

    public static List<String> constraintFilereader(String str) {
        List<String> constraintLst = new ArrayList<String>();
        try {
            File myObj = new File(str);
            Scanner myReader = new Scanner(myObj);
            while (myReader.hasNextLine()) {
                String data = myReader.nextLine();
                constraintLst.add(data);

            }

            myReader.close();
        } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
        return constraintLst;
    }

    public static void main(String[] args) {
        // inputFilereader("./Input219.txt");
        inputFilereader("./input.txt");

    }

}