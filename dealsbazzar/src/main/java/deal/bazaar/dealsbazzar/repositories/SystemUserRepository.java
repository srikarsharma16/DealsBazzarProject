package deal.bazaar.dealsbazzar.repositories;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import deal.bazaar.dealsbazzar.models.SystemUser;

//import com.alchemy.patient.model.Patient;
//import deal.bazaar.dealsbazzar.model.SystemUser;

@Repository
public interface SystemUserRepository extends MongoRepository<SystemUser, String>{
	public SystemUser findByEmail(String email);
}
