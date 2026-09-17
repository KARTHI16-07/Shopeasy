package com.shopeasy.controller;

import com.shopeasy.dto.OrderRequest;
import com.shopeasy.entity.Order;
import com.shopeasy.entity.OrderStatus;
import com.shopeasy.security.services.UserDetailsImpl;
import com.shopeasy.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class OrderController {
    @Autowired
    private OrderService orderService;

    @GetMapping("/orders")
    public List<Order> getUserOrders(@AuthenticationPrincipal UserDetailsImpl userDetails) {
        return orderService.getOrdersByUserId(userDetails.getId());
    }

    @GetMapping("/orders/{id}")
    public ResponseEntity<Order> getOrderById(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @PathVariable Long id) {
        Order order = orderService.getOrderById(id);
        // Only allow user to see their own orders, or admin to see all
        if (!order.getUser().getId().equals(userDetails.getId()) 
            && userDetails.getAuthorities().stream().noneMatch(a -> a.getAuthority().equals("ROLE_ADMIN"))) {
            return ResponseEntity.status(403).build();
        }
        return ResponseEntity.ok(order);
    }

    @PostMapping("/orders")
    public ResponseEntity<Order> placeOrder(
            @AuthenticationPrincipal UserDetailsImpl userDetails,
            @RequestBody OrderRequest orderRequest) {
        Order order = orderService.placeOrder(
                userDetails.getId(), 
                orderRequest.getShippingAddress(), 
                orderRequest.getPaymentMethod());
        return ResponseEntity.ok(order);
    }

    @GetMapping("/admin/orders")
    @PreAuthorize("hasRole('ADMIN')")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @PutMapping("/admin/orders/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Order> updateOrderStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> statusUpdate) {
        OrderStatus status = OrderStatus.valueOf(statusUpdate.get("status"));
        return ResponseEntity.ok(orderService.updateOrderStatus(id, status));
    }
}
