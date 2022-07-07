import java.io.File; // Import the File class
import java.io.FileNotFoundException; // Import this class to handle errors
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import java.util.Scanner; // Import the Scanner class to read text files

public class Part1 {
    // count moves
    static int count = 0;

    public static String[] sort(String[] sourceArray) throws Exception {
        String[] arr = Arrays.copyOf(sourceArray, sourceArray.length);
        if (arr.length < 2) {
            // if there is only one ele in array
            return arr;
        }
        // allocate room for two side
        int middle = (int) Math.floor(arr.length / 2);
        String[] left = Arrays.copyOfRange(arr, 0, middle);
        String[] right = Arrays.copyOfRange(arr, middle, arr.length);
        // divide into smallest pieces(one ele a side)
        return merge(sort(left), sort(right));
    }

    protected static String[] merge(String[] left, String[] right) {
        String[] result = new String[left.length + right.length];
        int i = 0;
        while (left.length > 0 && right.length > 0) {
            // when both of sides have data, compare the smallest one of each side
            if (left[0].compareTo(right[0]) < 0) {
                // put the smaller one to the result array
                result[i++] = left[0];
                // remove the element
                left = Arrays.copyOfRange(left, 1, left.length);
                count++;
            } else {
                result[i++] = right[0];
                right = Arrays.copyOfRange(right, 1, right.length);
                count++;
            }
        }

        while (left.length > 0) {
            result[i++] = left[0];
            left = Arrays.copyOfRange(left, 1, left.length);
            count++;
        }

        while (right.length > 0) {
            result[i++] = right[0];
            right = Arrays.copyOfRange(right, 1, right.length);
            count++;
        }

        return result;
    }

    public static void main(String[] args) throws Exception {
        ReadFile rf = new ReadFile();
        // read input219 file
        ArrayList<String> inputAry = rf.GetInputFile();
        // convert input list to input String[]
        String[] lst = inputAry.toArray(new String[0]);

        // first 100 words
        String[] first100_Lst = new String[100];
        for (int i = 0; i < first100_Lst.length; i++) {
            first100_Lst[i] = lst[i];
        }
        long startTimeOf100 = System.currentTimeMillis();
        // merge sort first 100
        String[] resOf100 = sort(first100_Lst);
        long endTimeOf100 = System.currentTimeMillis();
        System.out.println(Arrays.toString(resOf100));
        System.out.println("moves sorting first 100 word takes: " + count);
        System.out.println("Process Time of first 100 words: " + (endTimeOf100 - startTimeOf100) + "ms");
        System.out.println("--------------------------------------------------------------------------------------");

        // first 200 words
        count = 0;
        String[] first200_Lst = new String[200];
        for (int i = 0; i < first200_Lst.length; i++) {
            first200_Lst[i] = lst[i];
        }
        long startTimeOf200 = System.currentTimeMillis();
        // merge sort first 100
        String[] resOf200 = sort(first200_Lst);
        long endTimeOf200 = System.currentTimeMillis();
        System.out.println(Arrays.toString(resOf200));
        System.out.println("moves sorting first 200 word takes: " + count);
        System.out.println("Process Time of first 200 words: " + (endTimeOf200 - startTimeOf200) + "ms");
        System.out.println("--------------------------------------------------------------------------------------");

        // first 300 words
        count = 0;
        String[] first300_Lst = new String[300];
        for (int i = 0; i < first300_Lst.length; i++) {
            first300_Lst[i] = lst[i];
        }
        long startTimeOf300 = System.currentTimeMillis();
        // merge sort first 100
        String[] resOf300 = sort(first300_Lst);
        long endTimeOf300 = System.currentTimeMillis();
        System.out.println(Arrays.toString(resOf300));
        System.out.println("moves sorting first 300 word takes: " + count);
        System.out.println("Process Time of first 300 words: " + (endTimeOf300 - startTimeOf300) + "ms");
        System.out.println("--------------------------------------------------------------------------------------");

        count = 0;
        long startTime = System.currentTimeMillis();
        // merge sort input
        String[] res = sort(lst);
        long endTime = System.currentTimeMillis();
        // print result
        System.out.println(Arrays.toString(res));
        System.out.println("moves sorting takes: " + count);
        System.out.println("Process Time: " + (endTime - startTime) + "ms");
        ;
    }

}