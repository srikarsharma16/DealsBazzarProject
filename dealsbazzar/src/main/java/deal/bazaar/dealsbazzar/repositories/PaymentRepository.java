package deal.bazaar.dealsbazzar.repositories;

import deal.bazaar.dealsbazzar.models.Payment;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends MongoRepository<Payment, String>{
    
}
