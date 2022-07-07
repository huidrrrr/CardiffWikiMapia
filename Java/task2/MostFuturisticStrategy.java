public class MostFuturisticStrategy implements ChoiceStrategy {

	@Override
	public Product chooseBetween(Product a, Product b) {
		if (a.futuristicness>=b.futuristicness) {
			return a;
		}
		return b;
	}
 	 // Complete this with an implementation of
	// chooseBetween(Product a, Product b) which returns
	// Product a if its futuristicness is greater than or equal
	// to that of b; and returns Product b otherwise
}


