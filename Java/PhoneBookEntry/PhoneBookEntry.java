public class PhoneBookEntry {
    private String name;
    private String number;

    public PhoneBookEntry(String inName, String inNumber) {
        name = inName;
        number = inNumber;
    }
    public String getName() {
        return name;
    }
    public String getNumber() {
        return number;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setNumber(String number) {
        this.number = number;
    }
    @Override
    public String toString() {
        String s = name+"\t(" + number+")";
        return s;
    }
}
