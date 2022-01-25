package deal.bazaar.dealsbazzar.services;

import deal.bazaar.dealsbazzar.models.Payment;
import deal.bazaar.dealsbazzar.repositories.PaymentRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PaymentService {
    
    @Autowired
    PaymentRepository paymentRepository;

    public Payment savePayment(Payment payment)
    {
        try{
            paymentRepository.insert(payment);
            return payment;
        }catch(Exception e){
            return null;
        }
    }
}
