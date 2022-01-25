package deal.bazaar.dealsbazzar.controllers;

import deal.bazaar.dealsbazzar.models.Order;
import deal.bazaar.dealsbazzar.models.Payment;
import deal.bazaar.dealsbazzar.models.ResponseData;
import deal.bazaar.dealsbazzar.models.SendOrderDetails;
import deal.bazaar.dealsbazzar.services.CommonService;
import deal.bazaar.dealsbazzar.services.PaymentService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dealbazzar")
@CrossOrigin(origins = { "http://localhost:4200", "http://localhost:3000" })
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @Autowired
    private CommonService commonService;

    @PostMapping("/payment")
    public ResponseData savePayment(@RequestParam String paymentTypeId,@RequestParam double bidderPrice,
    @RequestParam String bidId)
    {
        Payment payment=new Payment();
        payment.setPaymentTypeId(paymentTypeId);
        payment.setBidderPrice(bidderPrice);

        SendOrderDetails o= commonService.savePayment(payment,bidId);
        
        if(o==null)
            return new ResponseData(400,null,"payment cancelled");
        else
            return new ResponseData(200,o,"successfully payed");
    }
}
