public class Cat implements move {
    String name;
    int age;

    @Override
    public boolean run(int a, int b) {
        if (a + b == 3) {
            return true;
        }
        return false;
    }
}
