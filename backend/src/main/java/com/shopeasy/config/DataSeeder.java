package com.shopeasy.config;

import com.shopeasy.entity.Category;
import com.shopeasy.entity.Product;
import com.shopeasy.entity.Role;
import com.shopeasy.entity.User;
import com.shopeasy.repository.CategoryRepository;
import com.shopeasy.repository.ProductRepository;
import com.shopeasy.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        if (userRepository.count() == 0) {
            User admin = User.builder()
                    .firstName("Admin")
                    .lastName("User")
                    .email("admin@shopeasy.com")
                    .password(passwordEncoder.encode("admin123"))
                    .role(Role.ROLE_ADMIN)
                    .build();
            userRepository.save(admin);

            User testUser = User.builder()
                    .firstName("Test")
                    .lastName("User")
                    .email("user@shopeasy.com")
                    .password(passwordEncoder.encode("user123"))
                    .role(Role.ROLE_USER)
                    .address("123 Test Street, Test City")
                    .phone("1234567890")
                    .build();
            userRepository.save(testUser);
        }

        if (categoryRepository.count() == 0) {
            Category electronics = Category.builder().name("Electronics").description("Electronic items").build();
            Category clothing = Category.builder().name("Clothing").description("Apparel and clothes").build();
            Category books = Category.builder().name("Books").description("Books and literature").build();
            categoryRepository.saveAll(Arrays.asList(electronics, clothing, books));

            if (productRepository.count() == 0) {
                Product p1 = Product.builder().name("Smartphone").description("Latest smartphone").price(new BigDecimal("699.99")).stock(50).category(electronics).imageUrl("https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop").build();
                Product p2 = Product.builder().name("Laptop").description("High performance laptop").price(new BigDecimal("1299.99")).stock(30).category(electronics).imageUrl("https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=600&auto=format&fit=crop").build();
                Product p3 = Product.builder().name("T-Shirt").description("Cotton T-shirt").price(new BigDecimal("19.99")).stock(100).category(clothing).imageUrl("https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop").build();
                Product p4 = Product.builder().name("Java Programming Book").description("Learn Java fast").price(new BigDecimal("39.99")).stock(200).category(books).imageUrl("https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=600&auto=format&fit=crop").build();
                
                productRepository.saveAll(Arrays.asList(p1, p2, p3, p4));
            }
        }
    }
}
