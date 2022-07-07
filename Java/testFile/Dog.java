public class Dog implements move {
    String name;
    int age;

    @Override
    public boolean run(int a, int b) {
        if (a == b) {
            return true;
        }
        return false;
    }
}