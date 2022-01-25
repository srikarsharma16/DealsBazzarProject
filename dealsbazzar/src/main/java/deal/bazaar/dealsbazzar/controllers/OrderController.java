package deal.bazaar.dealsbazzar.controllers;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import deal.bazaar.dealsbazzar.global.GlobalData;
import deal.bazaar.dealsbazzar.models.Order;
import deal.bazaar.dealsbazzar.models.SendOrderDetails;
import deal.bazaar.dealsbazzar.models.SystemUser;
import deal.bazaar.dealsbazzar.responses.ResponseData;
import deal.bazaar.dealsbazzar.security.JwtTokenUtil;
import deal.bazaar.dealsbazzar.services.CommonService;
import deal.bazaar.dealsbazzar.services.OrderService;
import deal.bazaar.dealsbazzar.services.SystemUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/order")
@CrossOrigin(origins = { "http://localhost:4200", "http://localhost:3000" })
public class OrderController {

    Date date=new Date();
    SimpleDateFormat formatter=new SimpleDateFormat("dd/mm/yyyy");
    String currentDate=formatter.format(date);

    @Autowired
    private CommonService commonService;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private OrderService orderService;

    @Autowired
    private SystemUserService userService;

    @PostMapping("/addorder")
    public ResponseData addOrder(@RequestBody Order order) {
        
        SystemUser s= userService.getById(jwtTokenUtil.getUserIdFromToken(GlobalData.token));
        order.setUserName(s.getName());
        order.setOrderId(UUID.randomUUID().toString());
        order.setOrderDate(currentDate);
        Order data = orderService.addOrder(order);
        if (data != null) {

            return new ResponseData(200, data, "order placed successfully");
        }
        return new ResponseData(400, null, "order is not placed");
    }

    @GetMapping("/getorders")
    public ResponseData getOrders() {

        List<SendOrderDetails> orderList = commonService.getOrders();
        if (orderList!= null) {
            return new ResponseData(200, orderList, "success");
        }
        return new ResponseData(400, null, "order details not found");
    }

    @GetMapping("/getUserOrders")
    public ResponseData getUserOrders() {

        List<SendOrderDetails> orderList = commonService.getUserOrders();
        if (orderList!= null) {
            return new ResponseData(200, orderList, "success");
        }
        return new ResponseData(400, null, "order details not found");
    }

    /* @PutMapping("/updateorder")
    public ResponseData updateOrder(@RequestBody Order order){
        Order data = orderService.validateId(order.getOrderId());
        if (data == null) {
            return new ResponseData(800, null, "give proper order id");
        }
        data=new Order();
        data=orderService.updateOrder(order);
        if(data==null){
            return new ResponseData(400, order, "order could not be updated");
        }else{
            return new ResponseData(200, data, "order is successfully updated");
        }
    } */

    @PutMapping("/cancelorder")
    public ResponseData updateOrder(@RequestBody SendOrderDetails order){
        SendOrderDetails s=commonService.updateOrderStatus(order);
        if(s==null){
            return new ResponseData(400, order, "order could not be updated");
        }else{
            return new ResponseData(200, s, "order is successfully updated");
        }
    }



    @PutMapping("/markdelivered")
    public ResponseData markdelivered(@RequestBody SendOrderDetails order){
        SendOrderDetails s=commonService.markdelivered(order);
        if(s==null){
            return new ResponseData(400, order, "order could not be updated");
        }else{
            return new ResponseData(200, s, "order is successfully updated");
        }
    }


}