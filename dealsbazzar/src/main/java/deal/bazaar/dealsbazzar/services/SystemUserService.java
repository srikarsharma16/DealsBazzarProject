package deal.bazaar.dealsbazzar.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;

//import com.alchemy.patient.model.Patient;
import deal.bazaar.dealsbazzar.models.SystemUser;
//import com.alchemy.patient.repository.PatientRepository;
import deal.bazaar.dealsbazzar.repositories.SystemUserRepository;

@Service
public class SystemUserService 
{
	@Autowired
	private SystemUserRepository userRepository;
	
	public SystemUser saveUser(SystemUser user) 
	{
		try {
			
			user.setIsActive(true);
			userRepository.insert(user);		
			return user;
		}catch(Exception ex) {
			return null;
		}
	}
	public SystemUser getById(String userid) 
	{
		return userRepository.findById(userid).get();	
	}
	public SystemUser getByEmail(String email) 
	{
		return userRepository.findByEmail(email);		
	}

	public SystemUser validateId(String userid) {
        try {
            return userRepository.findById(userid).get();	
        } catch (Exception e) {
            return null;
        }
    }

	public List<SystemUser> loadUsers()
    {
        try{
            List<SystemUser> u= userRepository.findAll();
            return u;
        }catch(Exception e)
        {
            return null;
        }
    }

	public SystemUser updateProfile(SystemUser systemUser) {
        try {
            return userRepository.save(systemUser);
        } catch (Exception e) {
            return null;
        }
    }
}
