package deal.bazaar.dealsbazzar.controllers;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import deal.bazaar.dealsbazzar.global.GlobalData;
import deal.bazaar.dealsbazzar.models.Bid;
import deal.bazaar.dealsbazzar.models.Product;
import deal.bazaar.dealsbazzar.models.SystemUser;
import deal.bazaar.dealsbazzar.responses.ResponseData;
import deal.bazaar.dealsbazzar.security.JwtTokenUtil;
import deal.bazaar.dealsbazzar.services.BidService;
import deal.bazaar.dealsbazzar.services.ProductService;
import deal.bazaar.dealsbazzar.services.SystemUserService;

import org.apache.tomcat.jni.Global;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/bid")
@CrossOrigin(origins = { "http://localhost:4200", "http://localhost:3000" })
public class BidController {

    Date date = new Date();
    SimpleDateFormat formatter = new SimpleDateFormat("dd/mm/yyyy");
    String currentDate = formatter.format(date);

    @Autowired
    private JwtTokenUtil tokenUtil;

    @Autowired
    private ProductService productService;

    @Autowired
    private SystemUserService userService;

    @Autowired
    private BidService bidService;

    @PostMapping("/addBid")
    public ResponseData addBId(@RequestBody Bid bid) {
        bid.setUserId(tokenUtil.getUserIdFromToken(bid.getUserId()));
        bid.setBidId(UUID.randomUUID().toString());
        bid.setBidDate(currentDate);
        bid.setBidStatus(-1);
        Bid data = bidService.addBid(bid);
        bid.setUserId(GlobalData.token);
        if (data != null) {

            return new ResponseData(200, data, "bid placed successfully");
        }
        return new ResponseData(400, null, "bid is not placed");
    }

    @GetMapping("/getBids")
    public ResponseData getBids() {

        List<Bid> bidList = bidService.getBids();
        if (bidList.size() > 0) {
            return new ResponseData(200, bidList, "fetched");
        }
        return new ResponseData(400, null, "no bids placed");
    }

    @GetMapping("/getOtherUsersBids")
    public ResponseData getUsersBidList() {
        List<Product> productList = productService.getProductById(tokenUtil.getUserIdFromToken(GlobalData.token));
        List<SystemUser> userList = userService.loadUsers();
        List<Bid> bidList = bidService.getBids();
        List<Bid> b = new ArrayList<Bid>();
        for (Product p : productList) {

            for (Bid bid : bidList) {

                if (p.getProductId().equals(bid.getProductId())) {

                    int i = bid.getBidStatus();
                    // check for bids for a particular
                    if (i == 1 || i == -1) { // product

                        for (SystemUser s : userList) {

                            if (bid.getUserId().equals(s.getUserId())) {

                                bid.setUserId(s.getName()); // replace user name in place of user Id
                                b.add(bid);
                            }
                        }
                    }
                }
            }
        }
        if (b.size() > 0) {
            return new ResponseData(200, b, "fetched");
        }
        return new ResponseData(400, null, "no bids placed");
    }

    @GetMapping("/getUserBids")
    public ResponseData getLoggedUserBids() {

        List<Bid> bidList = bidService.getBidsByUserId(tokenUtil.getUserIdFromToken(GlobalData.token));
        List<Bid> b=new ArrayList<Bid>();
        for(Bid bid:bidList){
            if(bid.getBidStatus()==1){
                b.add(bid);
            }else if(bid.getBidStatus()==-1){
                b.add(bid);
            }else{

            }
        }
        if (bidList.size() > 0) {
            return new ResponseData(200, b, "fetched");
        }
        return new ResponseData(400, null, "no bids placed");
    }

    @PutMapping("/updateBid")
    public ResponseData updateBid(@RequestBody List<Bid> recievedbidlist) {
        List<Bid> bidList = bidService.getBids();
        Bid sendBid = new Bid(); // array list

        for (Bid recdata : recievedbidlist) {

            if (recdata.getBidStatus() == 2) { // finding accepted bid from the recieved list

                for (Bid bid : bidList) {

                    if (bid.getBidId().equals(recdata.getBidId())) { // finding the clear data of the bid

                        bid.setBidStatus(1); // updating the clear data for the accepted bids
                        Bid b1 = new Bid();
                        b1 = bidService.updateBid(bid);
                        b1.setUserId(recdata.getUserId());
                        sendBid = b1;

                    }

                }
            } else if (recdata.getBidStatus() == -1) // if it is pending update it to rejected
            {

                for (Bid bid : bidList) {

                    if (bid.getBidId().equals(recdata.getBidId())) { // finding the clear data of the bid

                        bid.setBidStatus(0); // updating the clear data for the rejected bids
                        Bid b1 = new Bid();
                        b1 = bidService.updateBid(bid);
                        b1.setUserId(recdata.getUserId());

                    }

                }

            } else {
                System.out.println("do nothing");
            }
        }
        if (sendBid != null) {
            return new ResponseData(200, sendBid, "bid is successfully updated");
        }
        /*
         * Bid data = bidService.validateId(bid.getBidId()); //gets bid details
         * List<Bid> bidList = new ArrayList<Bid>(); //new array
         * 
         * if (data != null) {
         * 
         * data.setBidStatus(bid.getBidStatus()); //bid status updated to accepted
         * data = bidService.updateBid(data);
         * 
         * bidList.add(data); //added to new list
         * 
         * for (Bid b : GlobalData.bids) {
         * 
         * if (bid.getProductId() == b.getProductId()) {
         * b.setBidStatus(0);
         * bidService.updateBid(b);
         * bidList.add(b);
         * }
         * }
         */ /*
             * return new ResponseData(200, bidList, "bid is successfully updated");
             * }
             */
        return new ResponseData(400, null, "bid could not be updated");
    }

    @DeleteMapping("/deleteBid/{bidId}")
    public ResponseData deleteBid(@PathVariable String bidId) {
        Bid b = bidService.validateId(bidId);
        if (b == null) {
            return new ResponseData(800, null, "bid not found");
        }
        boolean result = bidService.deleteBid(bidId);
        if (result) {
            return new ResponseData(200, null, "successfully deleted");
        } else {
            return new ResponseData(400, null, "bid could not deleted");
        }
    }
}

