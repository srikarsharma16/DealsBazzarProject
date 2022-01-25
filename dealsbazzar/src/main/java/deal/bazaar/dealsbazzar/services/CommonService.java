package deal.bazaar.dealsbazzar.services;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import deal.bazaar.dealsbazzar.global.GlobalData;
import deal.bazaar.dealsbazzar.models.Bid;
import deal.bazaar.dealsbazzar.models.Order;
import deal.bazaar.dealsbazzar.models.Payment;
import deal.bazaar.dealsbazzar.models.Product;
import deal.bazaar.dealsbazzar.models.SendOrderDetails;
import deal.bazaar.dealsbazzar.models.SystemUser;
import deal.bazaar.dealsbazzar.security.JwtTokenUtil;

@Service
public class CommonService {

    Date date = new Date();
    SimpleDateFormat formatter = new SimpleDateFormat("dd/mm/yyyy");
    String currentDate = formatter.format(date);

    @Autowired
    private OrderService orderService;

    @Autowired
    private JwtTokenUtil tokenUtil;

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private ProductService productService;

    @Autowired
    private SystemUserService userService;

    @Autowired
    private BidService bidService;

    private List<SystemUser> userList;

    public List<SendOrderDetails> getOrders() {
        List<Product> productList = productService.getProductById(tokenUtil.getUserIdFromToken(GlobalData.token));
        List<SystemUser> userList = userService.loadUsers();
        List<Bid> bidList = bidService.getBids();
        List<Order> ordersList = orderService.getOrders();
        List<SendOrderDetails> orderlist = new ArrayList<SendOrderDetails>();
        for (Product p : productList) {

            for (Bid bid : bidList) {

                if (p.getProductId().equals(bid.getProductId())) {

                    int i = bid.getBidStatus();

                    // check for bids for a particular
                    if (i == 2) { // product

                        for (SystemUser s : userList) {

                            if (bid.getUserId().equals(s.getUserId())) {

                                bid.setUserId(s.getName()); // replace user name in place of user Id
                                for (Order o : ordersList) {
                                    if (o.getBidId().equals(bid.getBidId())) {
                                        SendOrderDetails so = new SendOrderDetails();
                                        so.setBidId(o.getBidId());
                                        so.setBidderPrice(bid.getBidPrice());
                                        so.setOrderDate(o.getOrderDate());
                                        so.setOrderId(o.getOrderId());
                                        so.setOrderStatus(o.getOrderStatus());
                                        so.setUserName(o.getUserName());
                                        so.setProductId(p.getProductId());
                                        so.setStock(bid.getBidStock());
                                        orderlist.add(so);
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
        if (orderlist.size() > 0) {
            return orderlist;
        }
        return null;
    }

    public List<SendOrderDetails> getUserOrders() {
        List<Bid> bidList = bidService.getBidsByUserId(tokenUtil.getUserIdFromToken(GlobalData.token));

        List<SendOrderDetails> orderlist = new ArrayList<SendOrderDetails>();

        List<Order> ordersList = orderService.getOrders();

        for (Bid b : bidList) {
            // replace user name in place of user Id
            for (Order o : ordersList) {
                if (o.getBidId().equals(b.getBidId())) {
                    SendOrderDetails so = new SendOrderDetails();
                    so.setBidId(o.getBidId());
                    so.setBidderPrice(b.getBidPrice());
                    so.setOrderDate(o.getOrderDate());
                    so.setOrderId(o.getOrderId());
                    so.setOrderStatus(o.getOrderStatus());
                    so.setUserName(o.getUserName());
                    so.setProductId(b.getProductId());
                    so.setStock(b.getBidStock());
                    orderlist.add(so);
                }
            }
        }
        System.out.println(orderlist);
        if (orderlist.size() > 0) {
            return orderlist;
        }
        return null;
    }

    public SendOrderDetails savePayment(Payment payment, String bidId) {
        SystemUser s = userService.getById(tokenUtil.getUserIdFromToken(GlobalData.token));

        List<Bid> bidList = bidService.getBids();
        Bid bid = new Bid();
        for (Bid b : bidList) {
            if (b.getBidId().equals(bidId)) {
                b.setBidStatus(2);
                bid = bidService.updateBid(b);
            }
        }

        // product Stock Update
        Product p = productService.validateId(bid.getProductId());
        int biddedStock = bid.getBidStock();
        int existingStock = p.getProductStock();
        int currentStock = existingStock - biddedStock;
        if (currentStock != 0) {
            p.setProductStock(currentStock);
        } else {
            p.setProductStock(currentStock);
            p.setProductStatus(false);
        }
        productService.updatewithoutId(p);

        Payment payed = paymentService.savePayment(payment);
        if (payed != null) {
            Order o = new Order();
            o.setUserName(s.getName());
            o.setBidId(bidId);
            o.setPaymentId(payed.getPaymentId());
            o.setOrderStatus("shipping");

            Order od = new Order();

            od = orderService.addOrder(o);
            SendOrderDetails so = new SendOrderDetails();
            so.setBidId(od.getBidId());
            so.setBidderPrice(bid.getBidPrice());
            so.setOrderDate(od.getOrderDate());
            so.setOrderId(od.getOrderId());
            so.setOrderStatus(od.getOrderStatus());
            so.setUserName(od.getUserName());
            so.setProductId(bid.getProductId());
            so.setStock(bid.getBidStock());
            return so;
        }
        return null;
    }

    public SendOrderDetails updateOrderStatus(SendOrderDetails order) {
        Order ord = orderService.validateId(order.getOrderId());
        if (ord != null) {
            if (ord.getOrderStatus().equals("shipping")) {
                ord.setOrderStatus("cancelled");
                orderService.updateOrder(ord);  //update order status
                Bid bid=bidService.validateId(ord.getBidId()); //fetch bid
                Product p=productService.validateId(order.getProductId()); //fetch product
                if(p.isProductStatus()==false){
                    p.setProductStatus(true);
                    p.setProductStock(p.getProductStock()+bid.getBidStock());
                    productService.updatewithoutId(p);
                }
                SendOrderDetails so = new SendOrderDetails();
                so.setBidId(ord.getBidId());
                so.setBidderPrice(bid.getBidPrice());
                so.setOrderDate(ord.getOrderDate());
                so.setOrderId(ord.getOrderId());
                so.setOrderStatus(ord.getOrderStatus());
                so.setUserName(ord.getUserName());
                so.setProductId(bid.getProductId());
                so.setStock(bid.getBidStock());
                return so; //return sendOrderDetails
            }
        }
        return null;
    }

    public SendOrderDetails markdelivered(SendOrderDetails order) {
        Order ord = orderService.validateId(order.getOrderId());
        if (ord != null) {
            if (ord.getOrderStatus().equals("shipping")) {
                ord.setOrderStatus("delivered");
                orderService.updateOrder(ord);  //update order status
                Bid bid=bidService.validateId(ord.getBidId()); //fetch bid
                
                SendOrderDetails so = new SendOrderDetails();
                so.setBidId(ord.getBidId());
                so.setBidderPrice(bid.getBidPrice());
                so.setOrderDate(ord.getOrderDate());
                so.setOrderId(ord.getOrderId());
                so.setOrderStatus(ord.getOrderStatus());
                so.setUserName(ord.getUserName());
                so.setProductId(bid.getProductId());
                so.setStock(bid.getBidStock());
                return so; //return sendOrderDetails
            }
        }
        return null;    }
}