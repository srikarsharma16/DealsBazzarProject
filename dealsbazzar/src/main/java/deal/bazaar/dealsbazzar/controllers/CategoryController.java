package deal.bazaar.dealsbazzar.controllers;

import java.util.List;

import deal.bazaar.dealsbazzar.models.Category;
import deal.bazaar.dealsbazzar.models.ResponseData;
import deal.bazaar.dealsbazzar.services.CategoryService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/dealbazzar")
@CrossOrigin(origins = { "http://localhost:4200", "http://localhost:3000" })
public class CategoryController {
    @Autowired
    private CategoryService categoryService;

    @PostMapping("/saveCategory")
    public ResponseData saveCategory(@RequestBody Category category)
    {
        Category newCategory = categoryService.saveCategory(category);
        if(newCategory==null)
			return new ResponseData(400, null, "data not added");
        else
			return new ResponseData(200, newCategory, "success");
    }

    @GetMapping("/fetchCategory")
    public ResponseData loadCategory()
    {
        List<Category> c= categoryService.loadCategory();
        if (c.size() > 0) {
            return new ResponseData(200, c, "success");
        }
        return new ResponseData(400, null, "Products not found");
    }

    @PutMapping("/updateCategory")
	public ResponseEntity updateCategory(@RequestBody Category category) 
	{		
		Category newCategory = categoryService.updateCategory(category);	
		if(newCategory==null)
			return new ResponseEntity<>(HttpStatus.NOT_MODIFIED);		
		else
			return ResponseEntity.ok(newCategory);
	}
	
	@DeleteMapping("/deleteCategory/{id}")
	public ResponseEntity deleteCategory(@PathVariable String id) 
	{		
		System.out.println(id);
		Category category = categoryService.get(id);
		if(category==null)
			return new ResponseEntity<>(HttpStatus.BAD_REQUEST);		
		else
		{
			boolean result = categoryService.deleteCategory(category);
			if(result)
				return new ResponseEntity<>(HttpStatus.OK);	
			else
				return new ResponseEntity(HttpStatus.NOT_IMPLEMENTED);
		}
	}

}
