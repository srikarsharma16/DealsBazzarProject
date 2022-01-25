package deal.bazaar.dealsbazzar.services;

import java.util.List;

import deal.bazaar.dealsbazzar.models.Bid;
import deal.bazaar.dealsbazzar.repositories.BidRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BidService {

    @Autowired
    private BidRepository bidRepository;

    public Bid addBid(Bid bid) {
        try {
            Bid data = bidRepository.insert(bid);
            return data;
        } catch (Exception e) {
            return null;
        }
    }

    public List<Bid> getBids() {
        try {
            List<Bid> data = bidRepository.findAll();
            return data;
        } catch (Exception e) {
            return null;
        }
    }

    public Bid validateId(String bidId) {
        try {
            System.out.println(bidId);
            Bid b = bidRepository.findById(bidId).get();
            System.out.println(b);
            return b;
        } catch (Exception e) {
            return null;
        }
    }

    public Bid updateBid(Bid bid) {
        try {
            return bidRepository.save(bid);
        } catch (Exception e) {
            return null;
        }
    }

    public boolean deleteBid(String bidId) {
        try {
            bidRepository.deleteById(bidId);
            return true;
        } catch (Exception e) {
            return false;
        }

    }

    public List<Bid> getBidsByUserId(String userId) {
        List<Bid> b = bidRepository.getBidsbyUserId(userId);
        if (b != null) {
            return b;
        }
        return null;
    }

}
