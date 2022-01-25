package deal.bazaar.dealsbazzar.repositories;

import deal.bazaar.dealsbazzar.models.PaymentType;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentTypeRepository extends MongoRepository<PaymentType, String>{
    
}
