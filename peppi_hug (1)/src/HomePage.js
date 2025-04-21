
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function HomePage() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [frete, setFrete] = useState(null);
  const [cep, setCep] = useState("");
  const [animatingItem, setAnimatingItem] = useState(null);

  // Recupera dados salvos ao iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    const savedUser = localStorage.getItem("user");
    if (savedCart) setCartItems(JSON.parse(savedCart));
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  // Salva carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // Salva ou remove usuário do localStorage
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  const handleAddToCart = (item) => {
    setAnimatingItem(item.nome);
    setCartItems((prev) => [...prev, item]);
    toast.success(`${item.nome} adicionado ao carrinho!`);
    setTimeout(() => setAnimatingItem(null), 400);
  };

  const handleRemoveFromCart = (indexToRemove) => {
    setCartItems((prev) => prev.filter((_, index) => index !== indexToRemove));
    toast.info("Item removido do carrinho");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (email && password) {
      setUser({ email });
      setShowLogin(false);
      toast.success("Login realizado com sucesso");
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Tem certeza que deseja sair?");
    if (confirmLogout) {
      setUser(null);
      toast("Logout realizado");
      window.location.href = "/";
    }
  };

  const calcularFrete = () => {
    if (/^\d{8}$/.test(cep)) {
      const prefix = parseInt(cep.substring(0, 2));
      let valorFrete;

      if (prefix >= 10 && prefix <= 39) valorFrete = Math.random() * (20 - 15) + 15;
      else if (prefix >= 60 && prefix <= 69) valorFrete = Math.random() * (45 - 30) + 30;
      else if (prefix >= 70 && prefix <= 79) valorFrete = Math.random() * (30 - 20) + 20;
      else if (prefix >= 40 && prefix <= 59) valorFrete = Math.random() * (35 - 25) + 25;
      else valorFrete = 30;

      setFrete(valorFrete);
      toast.success("Frete calculado com sucesso");
    } else {
      toast.error("Digite um CEP válido com 8 dígitos.");
    }
  };

  const total = cartItems.reduce((sum, item) => sum + item.preco, 0);

  return (
    <div className="bg-pink-50 min-h-screen text-purple-900">
      {/* O restante do código continua igual */}
    </div>
  );
}
