package deal.bazaar.dealsbazzar.services;

import java.io.File;
import java.io.FileInputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

import deal.bazaar.dealsbazzar.global.GlobalData;
import deal.bazaar.dealsbazzar.models.Product;
import deal.bazaar.dealsbazzar.repositories.ProductRepository;
import deal.bazaar.dealsbazzar.security.JwtTokenUtil;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProductService {

    
    @Autowired
    private JwtTokenUtil tokenUtil;

    @Autowired
    private ProductRepository productRepository;

    public Product addProduct(Product product) {
        product.setProductId(UUID.randomUUID().toString());
        product.setProductStatus(false);
        try {
            Product data = productRepository.insert(product);
            return data;
        } catch (Exception e) {
            return null;
        }

    }

    public List<Product> getProducts() {
        try {
            List<Product> data = productRepository.findAll();
            for (Product p : data) { //each product
                if (p.getProductImages() != null) {
                    List<String> images=new ArrayList<String>();
                    for (String image : p.getProductImages()) { //each image
                        
                        try {
                                File file = new File(image);
                        
                                 FileInputStream fis = new FileInputStream(file); 
                                           
                                int size = fis.available();
                                byte arr[] = new byte[size];
                                
                                fis.read(arr);
                                fis.close();
                                byte[] encoded = Base64.getEncoder().encode(arr);
                               
                                String fileStr = new String(encoded);
                                images.add(fileStr);
                                
                        } catch (Exception e) {
                            System.out.println("image not found");
                        }
                    }
                    p.setProductImages(images);
                }
            }
            return data;
        } catch (Exception e) {
            return null;
        }
    }

    public boolean deleteProduct(String productId) {
        try {
            productRepository.deleteById(productId);
            return true;
        } catch (Exception e) {
            return false;
        }

    }

    public Product validateId(String productId) {
        try {
            return productRepository.findById(productId).get();
        } catch (Exception e) {
            return null;
        }
    }

    public Product updateProduct(Product product) {
        try {
            product.setVendorId(tokenUtil.getUserIdFromToken(GlobalData.token));
            return productRepository.save(product);
        } catch (Exception e) {
            return null;
        }
    }

    public Product updatewithoutId(Product product) {
        try {
            
            return productRepository.save(product);
        } catch (Exception e) {
            return null;
        }
    }

    public List<Product> getProductById(String vendorId) {
        try {
            return productRepository.getProductById(vendorId);
        } catch (Exception e) {
            return null;
        }
    }

}
