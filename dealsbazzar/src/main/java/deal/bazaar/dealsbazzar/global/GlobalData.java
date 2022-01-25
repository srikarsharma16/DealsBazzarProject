package deal.bazaar.dealsbazzar.global;

import java.util.ArrayList;
import java.util.List;

import deal.bazaar.dealsbazzar.models.Bid;
import deal.bazaar.dealsbazzar.models.Product;

public class GlobalData {

    public static String token;

    public static String paymentId;

    public static List<Product> products;

    public static List<Bid> bids;
    
    static{
        token="";
    }

    static{
        paymentId="";
    }

    static{
        products=new ArrayList<Product>();
    }
    
    static{
        bids=new ArrayList<Bid>();
    }
    
}
