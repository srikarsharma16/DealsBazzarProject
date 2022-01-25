package deal.bazaar.dealsbazzar.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

//import deal.bazaar.dealsbazzar.model.Patient;
import deal.bazaar.dealsbazzar.models.SystemUser;
import deal.bazaar.dealsbazzar.models.SystemUserDetails;
//import deal.bazaar.dealsbazzar.repository.PatientRepository;
import deal.bazaar.dealsbazzar.repositories.SystemUserRepository;


@Service
public class SystemUserDetailsService implements UserDetailsService 
{
	@Autowired
	SystemUserRepository userRepo;
	
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException 
	{
		SystemUser user = userRepo.findByEmail(email);
		System.out.println("user : "+user);
		
		return new SystemUserDetails(user);
	}
}
