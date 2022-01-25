package deal.bazaar.dealsbazzar.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import deal.bazaar.dealsbazzar.models.Product;

@Repository
public interface ProductRepository extends MongoRepository<Product,String> {

    @Query("{ 'vendorId' : ?0 }")
    List<Product> getProductById(String vendorId);
    
}
