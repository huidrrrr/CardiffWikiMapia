import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.Scanner;
import java.util.TreeMap;

public class ReadFile {
    public static Map<Character, List<String>> getConstraintFile() {

        Map<Character, List<String>> constraintMap = new TreeMap<>();
        try {
            // better solution coming soon
            // RandomAccessFile file = new RandomAccessFile("./google-10000-english-no-swears.txt.txt", "r");
            File myObj = new File("./google-10000-english-no-swears.txt.txt");
            Scanner myReader = new Scanner(myObj);
            while (myReader.hasNextLine()) {
                String data = myReader.nextLine();
                // constraintAry.add(data);
                // set word first character as key
                char key = data.charAt(0);
                if (constraintMap.containsKey(key)) {
                    // if key already exists add data to list
                    List<String> list = constraintMap.get(key);
                    list.add(data);
                } else {
                    // if key already does not exist add new list and key to list
                    List<String> list = new ArrayList<>();
                    list.add(data);
                    constraintMap.put(key, list);
                }
            }
            myReader.close();
        } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
        return constraintMap;

    }

    public ArrayList<String> GetInputFile() {
        ArrayList<String> inputAry = new ArrayList<>();
        Map<Character, List<String>> constraintMap = getConstraintFile();
        try {
            // read input file
            File myObj = new File("./Input219.txt");
            Scanner myReader = new Scanner(myObj);
            while (myReader.hasNextLine()) {
                String data = myReader.nextLine();
                if (!data.isEmpty()) {
                    // get each line into lst
                    data = data.replaceAll("/", " ");
                    String[] eachLine = data.split(" ");
                    // String[] to ArrayList<String>
                    ArrayList<String> eachLinelst = new ArrayList<>(Arrays.asList(eachLine));

                    for (String inputEle : eachLinelst) {
                        // remove Punctuation
                        String inputWithoutP = inputEle.replaceAll("\\p{Punct}", "");
                        // to lowercase
                        String inputEleLow = inputWithoutP.toLowerCase();
                        // get first character of inputEleLow as key
                        char keyOfInputElelow = inputEleLow.charAt(0);
                        if (constraintMap.containsKey(keyOfInputElelow)) {
                            // get corresponding list
                            List<String> targetLst = constraintMap.get(keyOfInputElelow);
                            for (String ele : targetLst) {
                                if (inputEleLow.equals(ele)) {
                                    inputAry.add(inputEle);
                                }
                            }
                        }
                    }
                }
            }
            myReader.close();
        } catch (FileNotFoundException e) {
            System.out.println("An error occurred.");
            e.printStackTrace();
        }
        return inputAry;

    }

}
