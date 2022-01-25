package deal.bazaar.dealsbazzar.repositories;

import deal.bazaar.dealsbazzar.models.Category;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends MongoRepository<Category, String>{
    
}
