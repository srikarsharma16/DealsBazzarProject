package deal.bazaar.dealsbazzar.controllers;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.UUID;

import deal.bazaar.dealsbazzar.global.GlobalData;
import deal.bazaar.dealsbazzar.models.Product;
import deal.bazaar.dealsbazzar.models.SystemUser;
import deal.bazaar.dealsbazzar.responses.ImageResponseData;
import deal.bazaar.dealsbazzar.responses.ResponseData;
import deal.bazaar.dealsbazzar.security.JwtTokenUtil;
import deal.bazaar.dealsbazzar.services.ProductService;
import deal.bazaar.dealsbazzar.services.SystemUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/product")
@CrossOrigin(origins = { "http://localhost:4200", "http://localhost:3000" })
public class ProductController {

    @Autowired
    private JwtTokenUtil tokenUtil;

    @Autowired
    private SystemUserService userService;

    @Autowired
    private ProductService productService;

    @PostMapping("/addProduct")
    public ResponseData addProduct(@RequestBody Product product) {

        product.setProductId(UUID.randomUUID().toString());
        product.setProductStatus(false);

        product.setVendorId(tokenUtil.getUserIdFromToken(product.getVendorId()));
        Product data = productService.addProduct(product);
        data.setVendorId(GlobalData.token);
        if (data != null) {

            return new ResponseData(200, data, "success");
        }
        return new ResponseData(400, null, "data not added");
    }

    public String loadImage(@RequestParam String Imagepath) {
        try {
            File imagePath = new File(Imagepath);
            FileInputStream file = new FileInputStream(imagePath);
            int size = file.available();
            byte arr[] = new byte[size];

            file.read(arr);
            file.close();
            byte[] encoded = Base64.getEncoder().encode(arr);

            String fileStr = new String(encoded);
            ImageResponseData res = new ImageResponseData();
            res.setImageBase64(fileStr);

            return fileStr;
        } catch (Exception ex) {

            return null;
        }
    }

    /*
     * @PostMapping("/loadProductImageList")
     * public ResponseData loadProductImageList(@RequestParam String productId) {
     * Product product = productService.validateId(productId);
     * if (product == null) {
     * return new ResponseData(400, null, "product not found");
     * }
     * GlobalData.images.clear();
     * List<String> imagesList = product.getProductImages();
     * for (String image : imagesList) {
     * try {
     * File imagePath = new File(image);
     * FileInputStream file = new FileInputStream(imagePath);
     * int size = file.available();
     * byte arr[] = new byte[size];
     * 
     * file.read(arr);
     * file.close();
     * byte[] encoded = Base64.getEncoder().encode(arr);
     * 
     * String fileStr = new String(encoded);
     * GlobalData.images.add(fileStr);
     * } catch (Exception ex) {
     * 
     * return new ResponseData(400, null, "couldn't find images");
     * }
     * }
     * System.out.println(GlobalData.images.size());
     * ImageResponseData res = new ImageResponseData();
     * res.setImageBase64List(GlobalData.images);
     * return new ResponseData(200, res, "fetched the images list successfully");
     * }
     */
    @PostMapping("/addProductImage")
    public ResponseData addImage(@RequestParam String productId, @RequestParam MultipartFile imageFile) {
        // directory path
        String directoryName = "/home/srikarkalle/Pictures/UploadedImages";

        Product product = productService.validateId(productId);
        if (product == null) {
            return new ResponseData(404, null, productId + "product not present in the data base");
        }
        try {
            // file bytes
            byte bytes[] = imageFile.getBytes();

            // file extension
            String fileName = imageFile.getOriginalFilename();
            String extension = fileName.substring(fileName.lastIndexOf("."));

            // file name
            fileName = UUID.randomUUID().toString() + extension;

            // uploading file into folder
            File file = new File(directoryName, fileName);
            FileOutputStream fileOutStream = new FileOutputStream(file);
            fileOutStream.write(bytes);
            fileOutStream.close();

            // updating the images list
            List<String> imageList = product.getProductImages(); // getting product images list
            if (imageList == null) {
                imageList = new ArrayList<String>();
            }
            imageList.add(file.getAbsolutePath()); // adding new image to the list
            product.setProductImages(imageList);
            product.setProductStatus(true);
            productService.updateProduct(product);
            product.setVendorId(GlobalData.token);
            // response
            imageList.remove(file.getAbsolutePath());

            String encodedImage = loadImage(file.getAbsolutePath());
            if (encodedImage != null) {
                imageList.add(encodedImage);
            }
            product.setProductImages(imageList);

            return new ResponseData(200, product, "Image added to the list successfully");

        } catch (Exception e) {
            return new ResponseData(400, null, e.getMessage());
        }
        // return new ResponseData(400, null,"");
    }

    @GetMapping("/getproducts")
    public ResponseData getProducts() {
        GlobalData.products.clear();
        List<Product> productList = productService.getProducts();
        List<SystemUser> userList = userService.loadUsers();

        if (!GlobalData.token.isEmpty()) {
            for (Product p : productList) {
                if (p.getVendorId().equals(tokenUtil.getUserIdFromToken(GlobalData.token))) {
                    p.setVendorId(GlobalData.token);
                    GlobalData.products.add(p);
                } else {
                    for (SystemUser s : userList) {

                        if (p.getVendorId().equals(s.getUserId())) {

                            p.setVendorId(s.getName());

                        }
                    }
                }
            }
        } else {
            for (Product p : productList) {
                p.setVendorId("");
            }
        }
        if (productList.size() > 0) {
            return new ResponseData(200, productList, "success");
        }
        return new ResponseData(400, null, "Products not found");
    }

    @DeleteMapping("/deleteproduct/{productId}")
    public ResponseData deleteProduct(@PathVariable String productId) {
        Product p = productService.validateId(productId);
        if (p == null) {
            return new ResponseData(800, null, "Product not Persent");
        }
        boolean result = productService.deleteProduct(productId);
        if (result) {
            return new ResponseData(200, null, "successfully deleted");
        } else {
            return new ResponseData(400, null, "Product could not deleted");
        }
    }

    @PutMapping("/updateProduct")
    public ResponseData updateProduct(@RequestBody Product product) {
        Product data = productService.validateId(product.getProductId());
        if (data == null) {
            return new ResponseData(800, null, "product id is required");
        }
        data = new Product();

        data = productService.updateProduct(product);
        data.setVendorId(GlobalData.token);
        if (data == null) {
            return new ResponseData(400, product, "product could not be updated");
        } else {
            return new ResponseData(200, data, "product is successfully updated");
        }
    }

}
