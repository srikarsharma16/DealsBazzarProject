package deal.bazaar.dealsbazzar.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import deal.bazaar.dealsbazzar.models.Admin;

@Repository
public interface AdminRepository extends MongoRepository<Admin,String>{
    Admin findByUserNameAndPassword(String userName, String password);
}
