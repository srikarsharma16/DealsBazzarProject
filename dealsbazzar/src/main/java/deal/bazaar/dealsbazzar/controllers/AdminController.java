package deal.bazaar.dealsbazzar.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import deal.bazaar.dealsbazzar.models.Admin;
import deal.bazaar.dealsbazzar.models.Category;
import deal.bazaar.dealsbazzar.models.ResponseData;
import deal.bazaar.dealsbazzar.models.SystemUser;
import deal.bazaar.dealsbazzar.repositories.SystemUserRepository;
import deal.bazaar.dealsbazzar.services.AdminService;
import deal.bazaar.dealsbazzar.services.CategoryService;
import deal.bazaar.dealsbazzar.services.SystemUserService;

@RestController
@RequestMapping("/admin")
@CrossOrigin(origins = { "http://localhost:4200", "http://localhost:3000" })
public class AdminController {
    @Autowired
    private AdminService adminService;

    @Autowired
	private SystemUserRepository userRepository;

    @Autowired
    private SystemUserService systemUserService;


    @PostMapping("/add")
    public Admin addAdmin(@RequestBody Admin admin){
        return adminService.addAdminUser(admin);
    }

    @PostMapping("/login")
    public String login(@RequestBody Admin admin){
        return  adminService.validateAdminUser(admin.getUserName(), admin.getPassword())
                ?"Login successfully.."
                :"bad credential please retry again !";
    }

    @GetMapping("/getUser")
    public ResponseData loadUsers() {

        //List<User> userList = UserService.loadUsers();
        List<SystemUser> userList = userRepository.findAll();
        if (userList.size() > 0) {
            return new ResponseData(200, userList, "success");
        }
        return new ResponseData(400, null, "Users not found");
    }

    /* @GetMapping("/getUserById/{userid}")
    public ResponseData getById(@PathVariable String userid) {

        SystemUser u = systemUserService.validateId(userid);
        if (u == null) {
            return new ResponseData(800, null, "User not Persent");
        }
        SystemUser result = systemUserService.getById(userid);
        if (result != null) {
            return new ResponseData(200, result, "Received user details successfully");
        } else {
            return new ResponseData(400, null, "User details could not be found");
        } 

    }

    @PutMapping("/updateProfile")
    public ResponseData updateProfile(@RequestBody SystemUser systemUser) {
        SystemUser data = systemUserService.validateId(systemUser.getUserId());
        if (data == null) {
            return new ResponseData(800, null, "User id is required");
        }
        data = new SystemUser();
        data = systemUserService.updateProfile(systemUser);
        if (data == null) {
            return new ResponseData(400, systemUser, "User details could not be updated");
        } else {
            return new ResponseData(200, data, "User detail is successfully updated");
        }
    } */
}
