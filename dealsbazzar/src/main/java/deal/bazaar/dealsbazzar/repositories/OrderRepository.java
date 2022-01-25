package deal.bazaar.dealsbazzar.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import deal.bazaar.dealsbazzar.models.Order;

@Repository
public interface OrderRepository extends MongoRepository<Order,String>{
    
}
