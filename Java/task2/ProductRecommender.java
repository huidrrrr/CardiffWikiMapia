public class ProductRecommender{
  
  public static void main(String args[]) {
    ProductRecommender recommender=new ProductRecommender();
    recommender.doExample();
  }
  
  public void doExample() {
    Product p1=new Product("DeLorean DMC-12", 5, 1);
    Product p2=new Product("LDV Maxus", 1, 5);
    MostPracticalStrategy mps = new MostPracticalStrategy();
    MostFuturisticStrategy mfs =new MostFuturisticStrategy();
    
   	System.out.println("Current strategy: choose most futuristic");
    System.out.println("vehicle: "+mfs.chooseBetween(p1, p2).name);
     
    System.out.println("Strategy changed: choose most practical");
    System.out.println("vehicle: "+mps.chooseBetween(p1, p2).name);
	// Add code here to create a MostPracticalStrategy and
	// print out the chosen vehicle according to this strategy

  }
}

