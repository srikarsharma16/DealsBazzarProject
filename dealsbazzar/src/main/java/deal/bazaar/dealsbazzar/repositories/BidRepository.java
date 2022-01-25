package deal.bazaar.dealsbazzar.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import deal.bazaar.dealsbazzar.models.Bid;

@Repository
public interface BidRepository extends MongoRepository<Bid,String> {
    
    @Query("{ 'userId' : ?0 }")
    public List<Bid> getBidsbyUserId(String userId);
    
}
