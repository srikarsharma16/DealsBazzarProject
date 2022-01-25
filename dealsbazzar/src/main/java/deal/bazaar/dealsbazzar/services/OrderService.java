package deal.bazaar.dealsbazzar.services;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import deal.bazaar.dealsbazzar.global.GlobalData;
import deal.bazaar.dealsbazzar.models.Order;
import deal.bazaar.dealsbazzar.models.SystemUser;
import deal.bazaar.dealsbazzar.repositories.OrderRepository;
import deal.bazaar.dealsbazzar.security.JwtTokenUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OrderService {

    Date date=new Date();
    SimpleDateFormat formatter=new SimpleDateFormat("dd/mm/yyyy");
    String currentDate=formatter.format(date);
    
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private SystemUserService userService;

    public Order addOrder(Order order) {
        try {
            SystemUser s = userService.getById(jwtTokenUtil.getUserIdFromToken(GlobalData.token));
            order.setUserName(s.getName());
            order.setOrderId(UUID.randomUUID().toString());
            order.setOrderDate(currentDate);
            
            Order data = orderRepository.insert(order);
            return data;
        } catch (Exception e) {
            return null;
        }
    }

    public List<Order> getOrders() {
        try {
            List<Order> data = orderRepository.findAll();
            return data;
        } catch (Exception e) {
            return null;
        }
    }

    public Order validateId(String orderId) {
        try {
            System.out.println(orderId);
            Order o = orderRepository.findById(orderId).get();
            System.out.println(o);
            return o;
        } catch (Exception e) {
            return null;
        }
    }

    public Order updateOrder(Order order) {
        try {
            return orderRepository.save(order);
        } catch (Exception e) {
            return null;
        }
    }

}
