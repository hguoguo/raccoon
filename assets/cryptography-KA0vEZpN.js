import{j as e,g as a}from"./index-hyqxTCwJ.js";import{K as n}from"./KnowledgeLayout-CwkOMHwC.js";import{P as s}from"./Playground-C6lk-t6G.js";import{S as c}from"./SideNote-BKvanovA.js";import{C as t,A as d,S as l}from"./ArticleNav-DhfiS38Y.js";import{D as r}from"./DiagramBlock-CLaKE9_7.js";import{I as p}from"./InterviewSection-BBNdwyyN.js";const x=[{id:"definition",text:"一句话定义",level:2},{id:"overview",text:"整体架构",level:2},{id:"symmetric",text:"对称加密",level:2},{id:"aes",text:"AES算法详解",level:3},{id:"des",text:"DES/3DES算法",level:3},{id:"asymmetric",text:"非对称加密",level:2},{id:"rsa",text:"RSA算法详解",level:3},{id:"message-digest",text:"消息摘要",level:2},{id:"md5-sha",text:"MD5与SHA系列",level:3},{id:"mac-hmac",text:"MAC与HMAC",level:3},{id:"playground",text:"代码实验场",level:2},{id:"misconceptions",text:"常见误区",level:2},{id:"interview",text:"面试真题",level:2},{id:"comparison",text:"对比分析",level:2}];function b({meta:i}){return e.jsxs("div",{className:"flex max-w-[100vw] overflow-x-hidden",children:[e.jsx("div",{className:"flex-1 min-w-0 px-4 sm:px-6 lg:px-10 xl:px-12 xl:pr-[240px] pb-20",children:e.jsxs(n,{meta:i,children:[e.jsx("h2",{id:"definition",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-6 sm:mt-10 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"一句话定义"}),e.jsx("blockquote",{className:"border-l-[3px] border-accent pl-4 sm:pl-5 py-2 my-5 bg-accent-soft/40 rounded-r-paper-md",children:e.jsxs("p",{className:"text-[15px] sm:text-base text-ink-light leading-[1.8] font-medium",children:[e.jsx("strong",{children:"加密与解密"}),"是通过数学算法将明文转换为密文（加密）或从密文还原为明文（解密）的技术， 包括",e.jsx("strong",{children:"对称加密"}),"（AES/DES）、",e.jsx("strong",{children:"非对称加密"}),"（RSA）和",e.jsx("strong",{children:"消息摘要"}),"（MD5/SHA）， 是保障数据安全的核心技术。"]})}),e.jsxs(t,{type:"tip",title:"为什么加密如此重要？",children:["在互联网时代，数据在传输和存储过程中面临被窃取、篡改的风险。加密技术通过数学算法确保：",e.jsxs("ul",{className:"list-disc list-inside mt-2 space-y-1",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"机密性"}),"：只有授权方能够读取数据"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"完整性"}),"：检测数据是否被篡改"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"身份认证"}),"：验证数据来源的真实性"]})]})]}),e.jsx("h2",{id:"overview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"整体架构"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["Java 提供了完整的加密 API（JCA/JCE），位于 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"javax.crypto"}),"和 ",e.jsx("code",{className:"font-mono text-[13px] bg-parchment-deep px-1.5 py-0.5 rounded-[3px]",children:"java.security"})," 包中。"]}),e.jsx(r,{title:"Java加密体系架构",children:`
┌─────────────────────────────────────────────┐
│         应用层（开发者使用）                  │
│   Cipher / MessageDigest / KeyGenerator     │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│       JCA/JCE（Java密码学架构）              │
│   - javax.crypto.*                          │
│   - java.security.*                         │
└──────────────────┬──────────────────────────┘
                   │ Provider机制
                   ▼
┌─────────────────────────────────────────────┐
│       加密提供者（Provider）                 │
│   - SunJCE（默认）                           │
│   - BouncyCastle（第三方）                   │
│   - IBMJCE（IBM提供）                        │
└──────────────────┬──────────────────────────┘
                   │
                   ▼
┌─────────────────────────────────────────────┐
│       底层加密算法实现                       │
│   - AES / RSA / DES / SHA / MD5             │
└─────────────────────────────────────────────┘
            `}),e.jsx(c,{children:e.jsxs("p",{className:"text-sm text-ink-muted",children:[e.jsx("strong",{children:"关键点："}),"JCA（Java Cryptography Architecture）定义了统一的接口， JCE（Java Cryptography Extension）提供了具体的加密算法实现。 通过 Provider 机制可以灵活切换不同的加密提供者。"]})}),e.jsx("h2",{id:"symmetric",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"对称加密"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["对称加密使用",e.jsx("strong",{children:"同一个密钥"}),"进行加密和解密，特点是速度快，适合大数据量加密。 主要算法包括 AES、DES、3DES。"]}),e.jsx("h3",{id:"aes",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"AES算法详解"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"AES（Advanced Encryption Standard）"}),"是目前最流行的对称加密算法， 支持 128、192、256 位密钥长度，采用分组加密模式（每组 128 位）。"]}),e.jsxs(t,{type:"info",title:"AES工作模式",children:[e.jsx("p",{className:"text-sm mb-2",children:"AES支持多种工作模式，不同模式影响安全性和性能："}),e.jsxs("ul",{className:"list-disc list-inside text-sm space-y-1",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"ECB"}),"（Electronic Codebook）：简单但安全性低，相同明文块产生相同密文块"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"CBC"}),"（Cipher Block Chaining）：每个块与前一个密文块异或，需要IV（初始化向量）"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"CTR"}),"（Counter）：计数器模式，可并行处理"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"GCM"}),"（Galois/Counter Mode）：提供加密和认证，推荐用于网络传输"]})]})]}),e.jsx(s,{code:`import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.security.SecureRandom;
import java.util.Base64;

public class AESEncryption {
    
    private static final String ALGORITHM = "AES";
    private static final String TRANSFORMATION = "AES/GCM/NoPadding";
    private static final int KEY_SIZE = 256; // 密钥长度
    private static final int GCM_IV_LENGTH = 12; // IV长度
    private static final int GCM_TAG_LENGTH = 128; // 认证标签长度
    
    /**
     * 生成AES密钥
     */
    public static SecretKey generateKey() throws Exception {
        KeyGenerator keyGenerator = KeyGenerator.getInstance(ALGORITHM);
        keyGenerator.init(KEY_SIZE);
        return keyGenerator.generateKey();
    }
    
    /**
     * 加密
     */
    public static byte[] encrypt(String plaintext, SecretKey key) throws Exception {
        Cipher cipher = Cipher.getInstance(TRANSFORMATION);
        
        // 生成随机IV
        byte[] iv = new byte[GCM_IV_LENGTH];
        SecureRandom random = new SecureRandom();
        random.nextBytes(iv);
        
        GCMParameterSpec parameterSpec = new GCMParameterSpec(GCM_TAG_LENGTH, iv);
        cipher.init(Cipher.ENCRYPT_MODE, key, parameterSpec);
        
        byte[] ciphertext = cipher.doFinal(plaintext.getBytes("UTF-8"));
        
        // 将IV和密文组合在一起（IV需要随密文一起传输）
        byte[] combined = new byte[iv.length + ciphertext.length];
        System.arraycopy(iv, 0, combined, 0, iv.length);
        System.arraycopy(ciphertext, 0, combined, iv.length, ciphertext.length);
        
        return combined;
    }
    
    /**
     * 解密
     */
    public static String decrypt(byte[] combined, SecretKey key) throws Exception {
        // 提取IV
        byte[] iv = new byte[GCM_IV_LENGTH];
        System.arraycopy(combined, 0, iv, 0, iv.length);
        
        // 提取密文
        byte[] ciphertext = new byte[combined.length - iv.length];
        System.arraycopy(combined, iv.length, ciphertext, 0, ciphertext.length);
        
        Cipher cipher = Cipher.getInstance(TRANSFORMATION);
        GCMParameterSpec parameterSpec = new GCMParameterSpec(GCM_TAG_LENGTH, iv);
        cipher.init(Cipher.DECRYPT_MODE, key, parameterSpec);
        
        byte[] plaintext = cipher.doFinal(ciphertext);
        return new String(plaintext, "UTF-8");
    }
    
    public static void main(String[] args) throws Exception {
        SecretKey key = generateKey();
        String original = "Hello, 加密世界！";
        
        byte[] encrypted = encrypt(original, key);
        String decrypted = decrypt(encrypted, key);
        
        System.out.println("原文: " + original);
        System.out.println("密文(Base64): " + Base64.getEncoder().encodeToString(encrypted));
        System.out.println("解密: " + decrypted);
        System.out.println("是否一致: " + original.equals(decrypted));
    }
}`,language:"java",description:"AES-GCM加密解密示例"}),e.jsx("h3",{id:"des",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"DES/3DES算法"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"DES（Data Encryption Standard）"}),"是早期的对称加密标准，密钥长度仅 56 位， 已被证明不安全。",e.jsx("strong",{children:"3DES（Triple DES）"}),"通过三次DES加密提高安全性，但速度慢于AES。"]}),e.jsx(t,{type:"warning",title:"⚠️ DES已过时",children:e.jsxs("p",{className:"text-sm",children:["DES由于密钥长度过短（56位），可以通过暴力破解在数小时内破解。 3DES虽然提高了安全性，但性能较差。",e.jsx("strong",{children:"现代应用应优先使用AES"}),"。 DES/3DES仅在与遗留系统兼容时使用。"]})}),e.jsx("h2",{id:"asymmetric",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"非对称加密"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["非对称加密使用",e.jsx("strong",{children:"一对密钥"}),"：公钥（Public Key）和私钥（Private Key）。 公钥加密的数据只能用私钥解密，私钥签名的数据只能用公钥验证。 主要算法包括 RSA、ECC（椭圆曲线加密）。"]}),e.jsx("h3",{id:"rsa",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"RSA算法详解"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"RSA（Rivest-Shamir-Adleman）"}),"是最常用的非对称加密算法，基于大数分解的数学难题。 密钥长度通常为 2048 位或 4096 位。"]}),e.jsx(r,{title:"RSA加密流程",children:`
发送方                          接收方
  |                               |
  |  1. 获取接收方公钥             |
  |  ◄──────────────────────────  |
  |                               |
  |  2. 用公钥加密数据             |
  |     Ciphertext = Encrypt      |
  |       (Plaintext, PublicKey)  |
  |                               |
  |  3. 发送密文                   |
  |  ──────────────────────────►  |
  |                               |
  |                          4. 用私钥解密
  |                             Plaintext = Decrypt
  |                               (Ciphertext, PrivateKey)
  |                               |
  |                          5. 得到明文
            `}),e.jsx(s,{code:`import javax.crypto.Cipher;
import java.security.*;
import java.security.spec.PKCS8EncodedKeySpec;
import java.security.spec.X509EncodedKeySpec;
import java.util.Base64;

public class RSAEncryption {
    
    private static final String ALGORITHM = "RSA";
    private static final String TRANSFORMATION = "RSA/ECB/PKCS1Padding";
    private static final int KEY_SIZE = 2048;
    
    /**
     * 生成RSA密钥对
     */
    public static KeyPair generateKeyPair() throws Exception {
        KeyPairGenerator keyPairGenerator = KeyPairGenerator.getInstance(ALGORITHM);
        keyPairGenerator.initialize(KEY_SIZE);
        return keyPairGenerator.generateKeyPair();
    }
    
    /**
     * 公钥加密
     */
    public static byte[] encryptWithPublicKey(String plaintext, PublicKey publicKey) throws Exception {
        Cipher cipher = Cipher.getInstance(TRANSFORMATION);
        cipher.init(Cipher.ENCRYPT_MODE, publicKey);
        return cipher.doFinal(plaintext.getBytes("UTF-8"));
    }
    
    /**
     * 私钥解密
     */
    public static String decryptWithPrivateKey(byte[] ciphertext, PrivateKey privateKey) throws Exception {
        Cipher cipher = Cipher.getInstance(TRANSFORMATION);
        cipher.init(Cipher.DECRYPT_MODE, privateKey);
        byte[] plaintext = cipher.doFinal(ciphertext);
        return new String(plaintext, "UTF-8");
    }
    
    /**
     * 私钥签名
     */
    public static byte[] sign(String data, PrivateKey privateKey) throws Exception {
        Signature signature = Signature.getInstance("SHA256withRSA");
        signature.initSign(privateKey);
        signature.update(data.getBytes("UTF-8"));
        return signature.sign();
    }
    
    /**
     * 公钥验签
     */
    public static boolean verify(String data, byte[] signatureBytes, PublicKey publicKey) throws Exception {
        Signature signature = Signature.getInstance("SHA256withRSA");
        signature.initVerify(publicKey);
        signature.update(data.getBytes("UTF-8"));
        return signature.verify(signatureBytes);
    }
    
    public static void main(String[] args) throws Exception {
        // 生成密钥对
        KeyPair keyPair = generateKeyPair();
        PublicKey publicKey = keyPair.getPublic();
        PrivateKey privateKey = keyPair.getPrivate();
        
        // 加密解密
        String original = "Hello, RSA!";
        byte[] encrypted = encryptWithPublicKey(original, publicKey);
        String decrypted = decryptWithPrivateKey(encrypted, privateKey);
        
        System.out.println("原文: " + original);
        System.out.println("密文(Base64): " + Base64.getEncoder().encodeToString(encrypted));
        System.out.println("解密: " + decrypted);
        System.out.println("是否一致: " + original.equals(decrypted));
        
        // 签名验签
        String message = "重要数据";
        byte[] signature = sign(message, privateKey);
        boolean isValid = verify(message, signature, publicKey);
        
        System.out.println("\\n签名验证: " + (isValid ? "通过 ✓" : "失败 ✗"));
    }
}`,language:"java",description:"RSA加密与数字签名示例"}),e.jsxs(t,{type:"tip",title:"RSA的应用场景",children:[e.jsx("p",{className:"text-sm",children:"RSA通常不直接加密大量数据（速度慢），而是用于："}),e.jsxs("ul",{className:"list-disc list-inside text-sm mt-2 space-y-1",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"密钥交换"}),"：加密对称密钥（如HTTPS中的会话密钥）"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"数字签名"}),"：验证数据来源和完整性"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"身份认证"}),"：SSL/TLS证书"]})]})]}),e.jsx("h2",{id:"message-digest",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"消息摘要"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:["消息摘要（Hash）是单向函数，将任意长度的数据映射为固定长度的哈希值。 特点：",e.jsx("strong",{children:"不可逆"}),"、",e.jsx("strong",{children:"抗碰撞"}),"、",e.jsx("strong",{children:"雪崩效应"}),"。 主要用于数据完整性校验和密码存储。"]}),e.jsx("h3",{id:"md5-sha",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"MD5与SHA系列"}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"min-w-full divide-y divide-border border border-border rounded-paper-md",children:[e.jsx("thead",{className:"bg-parchment-deep",children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"算法"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"输出长度"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"安全性"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"适用场景"})]})}),e.jsxs("tbody",{className:"bg-white divide-y divide-border",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-mono text-sm",children:"MD5"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"128位"}),e.jsx("td",{className:"px-4 py-3 text-sm text-red-600",children:"❌ 已破解"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"文件校验（不推荐安全用途）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-mono text-sm",children:"SHA-1"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"160位"}),e.jsx("td",{className:"px-4 py-3 text-sm text-red-600",children:"❌ 已破解"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"Git版本控制（历史原因）"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-mono text-sm",children:"SHA-256"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"256位"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"✅ 安全"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"数字签名、区块链"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-mono text-sm",children:"SHA-512"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"512位"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"✅ 安全"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"高安全需求场景"})]})]})]})}),e.jsx(s,{code:`import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;

public class HashExample {
    
    /**
     * 计算SHA-256哈希
     */
    public static String sha256(String input) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("SHA-256");
        byte[] hash = digest.digest(input.getBytes());
        return HexFormat.of().formatHex(hash);
    }
    
    /**
     * 计算MD5哈希（仅用于文件校验，不用于安全用途）
     */
    public static String md5(String input) throws NoSuchAlgorithmException {
        MessageDigest digest = MessageDigest.getInstance("MD5");
        byte[] hash = digest.digest(input.getBytes());
        return HexFormat.of().formatHex(hash);
    }
    
    public static void main(String[] args) throws Exception {
        String data = "Hello, World!";
        
        System.out.println("原文: " + data);
        System.out.println("MD5: " + md5(data));
        System.out.println("SHA-256: " + sha256(data));
        
        // 验证雪崩效应：微小变化导致完全不同的哈希
        String data2 = "Hello, World"; // 少一个感叹号
        System.out.println("\\n原文: " + data2);
        System.out.println("SHA-256: " + sha256(data2));
        System.out.println("注意：两个哈希完全不同！");
    }
}`,language:"java",description:"消息摘要示例"}),e.jsx(t,{type:"danger",title:"⚠️ MD5和SHA-1已不安全",children:e.jsxs("p",{className:"text-sm",children:["MD5和SHA-1已被证明存在碰撞攻击漏洞，不应再用于安全相关的场景（如密码存储、数字签名）。",e.jsx("strong",{children:"推荐使用SHA-256或更高强度的算法"}),"。"]})}),e.jsx("h3",{id:"mac-hmac",className:"font-display font-semibold text-[17px] sm:text-lg mt-6 sm:mt-8 mb-3 text-ink",children:"MAC与HMAC"}),e.jsxs("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:[e.jsx("strong",{children:"MAC（Message Authentication Code）"}),"是带密钥的消息摘要，既保证数据完整性， 又提供身份认证。",e.jsx("strong",{children:"HMAC（Hash-based MAC）"}),"是基于哈希函数的MAC实现。"]}),e.jsx(s,{code:`import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.HexFormat;

public class HMACExample {
    
    private static final String ALGORITHM = "HmacSHA256";
    
    /**
     * 生成HMAC
     */
    public static byte[] generateHMAC(String data, String secretKey) 
            throws NoSuchAlgorithmException, InvalidKeyException {
        Mac mac = Mac.getInstance(ALGORITHM);
        SecretKeySpec keySpec = new SecretKeySpec(secretKey.getBytes(), ALGORITHM);
        mac.init(keySpec);
        return mac.doFinal(data.getBytes());
    }
    
    /**
     * 验证HMAC
     */
    public static boolean verifyHMAC(String data, String secretKey, byte[] expectedHMAC) 
            throws NoSuchAlgorithmException, InvalidKeyException {
        byte[] actualHMAC = generateHMAC(data, secretKey);
        return java.util.Arrays.equals(expectedHMAC, actualHMAC);
    }
    
    public static void main(String[] args) throws Exception {
        String data = "重要消息";
        String secretKey = "my-secret-key-12345";
        
        byte[] hmac = generateHMAC(data, secretKey);
        System.out.println("数据: " + data);
        System.out.println("HMAC: " + HexFormat.of().formatHex(hmac));
        
        // 验证
        boolean isValid = verifyHMAC(data, secretKey, hmac);
        System.out.println("验证结果: " + (isValid ? "通过 ✓" : "失败 ✗"));
        
        // 篡改数据后验证
        String tamperedData = "被篡改的消息";
        boolean isTamperedValid = verifyHMAC(tamperedData, secretKey, hmac);
        System.out.println("篡改后验证: " + (isTamperedValid ? "通过 ✓" : "失败 ✗"));
    }
}`,language:"java",description:"HMAC示例"}),e.jsx("h2",{id:"playground",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"代码实验场"}),e.jsx(s,{code:`import javax.crypto.Cipher;
import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.GCMParameterSpec;
import java.security.*;
import java.util.Base64;

/**
 * 综合加密工具类
 * 演示实际应用中如何组合使用各种加密技术
 */
public class CryptoUtils {
    
    /**
     * 混合加密方案：
     * 1. 生成随机AES密钥
     * 2. 用AES加密数据（快速）
     * 3. 用RSA公钥加密AES密钥（安全传输）
     * 4. 返回：加密后的AES密钥 + 加密后的数据
     */
    public static class EncryptedPackage {
        public byte[] encryptedAesKey;  // RSA加密的AES密钥
        public byte[] encryptedData;    // AES加密的数据
        public byte[] iv;               // AES的IV
        
        public EncryptedPackage(byte[] encryptedAesKey, byte[] encryptedData, byte[] iv) {
            this.encryptedAesKey = encryptedAesKey;
            this.encryptedData = encryptedData;
            this.iv = iv;
        }
    }
    
    /**
     * 加密（混合加密方案）
     */
    public static EncryptedPackage encrypt(String plaintext, PublicKey rsaPublicKey) throws Exception {
        // 1. 生成AES密钥
        KeyGenerator aesKeyGen = KeyGenerator.getInstance("AES");
        aesKeyGen.init(256);
        SecretKey aesKey = aesKeyGen.generateKey();
        
        // 2. AES加密数据
        Cipher aesCipher = Cipher.getInstance("AES/GCM/NoPadding");
        byte[] iv = new byte[12];
        new SecureRandom().nextBytes(iv);
        GCMParameterSpec gcmSpec = new GCMParameterSpec(128, iv);
        aesCipher.init(Cipher.ENCRYPT_MODE, aesKey, gcmSpec);
        byte[] encryptedData = aesCipher.doFinal(plaintext.getBytes("UTF-8"));
        
        // 3. RSA加密AES密钥
        Cipher rsaCipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
        rsaCipher.init(Cipher.ENCRYPT_MODE, rsaPublicKey);
        byte[] encryptedAesKey = rsaCipher.doFinal(aesKey.getEncoded());
        
        return new EncryptedPackage(encryptedAesKey, encryptedData, iv);
    }
    
    /**
     * 解密（混合加密方案）
     */
    public static String decrypt(EncryptedPackage pkg, PrivateKey rsaPrivateKey) throws Exception {
        // 1. RSA解密AES密钥
        Cipher rsaCipher = Cipher.getInstance("RSA/ECB/PKCS1Padding");
        rsaCipher.init(Cipher.DECRYPT_MODE, rsaPrivateKey);
        byte[] aesKeyBytes = rsaCipher.doFinal(pkg.encryptedAesKey);
        SecretKey aesKey = new SecretKeySpec(aesKeyBytes, "AES");
        
        // 2. AES解密数据
        Cipher aesCipher = Cipher.getInstance("AES/GCM/NoPadding");
        GCMParameterSpec gcmSpec = new GCMParameterSpec(128, pkg.iv);
        aesCipher.init(Cipher.DECRYPT_MODE, aesKey, gcmSpec);
        byte[] plaintext = aesCipher.doFinal(pkg.encryptedData);
        
        return new String(plaintext, "UTF-8");
    }
    
    public static void main(String[] args) throws Exception {
        // 生成RSA密钥对
        KeyPairGenerator rsaKeyGen = KeyPairGenerator.getInstance("RSA");
        rsaKeyGen.initialize(2048);
        KeyPair rsaKeyPair = rsaKeyGen.generateKeyPair();
        
        // 测试
        String original = "这是一条敏感信息，需要加密传输！";
        System.out.println("原文: " + original);
        
        // 加密
        EncryptedPackage pkg = encrypt(original, rsaKeyPair.getPublic());
        System.out.println("加密后的AES密钥长度: " + pkg.encryptedAesKey.length + " bytes");
        System.out.println("加密后的数据长度: " + pkg.encryptedData.length + " bytes");
        
        // 解密
        String decrypted = decrypt(pkg, rsaKeyPair.getPrivate());
        System.out.println("解密: " + decrypted);
        System.out.println("是否一致: " + original.equals(decrypted));
    }
}`,language:"java",description:"混合加密方案实战"}),e.jsx("h2",{id:"misconceptions",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"常见误区"}),e.jsxs(t,{type:"danger",title:"误区 1：认为Base64是加密",children:[e.jsx("p",{className:"text-sm mb-2",children:"❌ 错误认知：Base64编码可以保护数据安全"}),e.jsxs("p",{className:"text-sm",children:["✅ 正确理解：Base64只是",e.jsx("strong",{children:"编码方式"}),"，不是加密算法。任何人都可以轻松解码。 Base64的目的是将二进制数据转换为文本格式，便于在网络上传输，不提供任何安全性。"]})]}),e.jsxs(t,{type:"danger",title:"误区 2：认为哈希可以解密",children:[e.jsx("p",{className:"text-sm mb-2",children:"❌ 错误认知：MD5/SHA哈希后可以反向还原原始数据"}),e.jsxs("p",{className:"text-sm",children:["✅ 正确理解：哈希是",e.jsx("strong",{children:"单向函数"}),'，不可逆。只能通过彩虹表或暴力破解尝试匹配， 无法真正"解密"。这也是为什么密码应该加盐（Salt）后哈希存储。']})]}),e.jsxs(t,{type:"danger",title:"误区 3：密钥硬编码在代码中",children:[e.jsx("p",{className:"text-sm mb-2",children:"❌ 危险做法："}),e.jsx("pre",{className:"bg-parchment-deep p-3 rounded-paper-sm text-sm font-mono",children:`// 绝对不要这样做！
private static final String SECRET_KEY = "my-secret-key-12345";`}),e.jsxs("p",{className:"text-sm mt-2",children:["✅ 正确做法：密钥应从",e.jsx("strong",{children:"环境变量"}),"、",e.jsx("strong",{children:"配置文件"}),"或",e.jsx("strong",{children:"密钥管理服务"}),"（如AWS KMS、HashiCorp Vault）中获取。 代码提交到Git后，密钥就泄露了。"]})]}),e.jsxs(t,{type:"danger",title:"误区 4：忽略IV的重要性",children:[e.jsx("p",{className:"text-sm mb-2",children:"❌ 错误做法：使用固定的IV或重复使用IV"}),e.jsxs("p",{className:"text-sm",children:["✅ 正确做法：IV（初始化向量）应该是",e.jsx("strong",{children:"随机生成"}),"且",e.jsx("strong",{children:"每次加密都不同"}),"。 IV不需要保密，可以随密文一起传输，但必须保证唯一性。重复使用IV会导致严重的安全漏洞。"]})]}),e.jsx("h2",{id:"interview",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"面试真题"}),e.jsx(p,{questions:[{question:"对称加密和非对称加密的区别是什么？各自适用于什么场景？",answer:`核心区别：

1. 密钥数量：
   - 对称加密：1个密钥（加密和解密用同一个）
   - 非对称加密：2个密钥（公钥和私钥）

2. 性能：
   - 对称加密：速度快，适合大数据量加密
   - 非对称加密：速度慢（比对称加密慢1000倍以上）

3. 安全性：
   - 对称加密：密钥分发困难（如何安全地共享密钥？）
   - 非对称加密：解决了密钥分发问题

4. 典型算法：
   - 对称加密：AES、DES、3DES
   - 非对称加密：RSA、ECC

5. 应用场景：
   - 对称加密：文件加密、数据库字段加密、HTTPS数据传输
   - 非对称加密：密钥交换、数字签名、SSL证书

实际应用：HTTPS采用混合加密
- 握手阶段：用RSA交换AES密钥
- 数据传输：用AES加密数据（兼顾安全性和性能）`},{question:"AES和RSA哪个更安全？为什么？",answer:`这个问题本身有误导性，两者不能直接比较：

1. 安全性取决于密钥长度：
   - AES-256：目前被认为是安全的，量子计算机出现前不会破解
   - RSA-2048：目前安全，但建议迁移到RSA-4096或ECC

2. 用途不同：
   - AES是对称加密，用于加密大量数据
   - RSA是非对称加密，用于密钥交换和数字签名

3. 正确的比较方式：
   - 如果只考虑加密强度：AES-256 ≈ RSA-15360（理论上）
   - 但RSA不可能使用这么长的密钥（性能太差）

4. 最佳实践：
   - 不要二选一，而是组合使用
   - 用RSA加密AES密钥，用AES加密数据
   - 这样既保证了安全性，又保证了性能

结论：两者都很安全，关键是用对场景。`},{question:"什么是数字签名？它的工作原理是什么？",answer:`数字签名是基于非对称加密的身份认证和数据完整性验证机制。

工作原理：

1. 签名过程（发送方）：
   a. 对原始数据计算哈希（如SHA-256）
   b. 用私钥对哈希值进行加密 → 得到签名
   c. 发送：原始数据 + 签名

2. 验签过程（接收方）：
   a. 对收到的数据计算哈希
   b. 用公钥解密签名 → 得到原始哈希
   c. 对比两个哈希值：一致则验证通过

作用：
- 身份认证：只有持有私钥的人才能生成有效签名
- 数据完整性：数据被篡改后，哈希值会改变，验签失败
- 不可否认性：发送方无法否认自己发送过该数据

应用场景：
- 软件发布：验证下载的软件未被篡改
- 合同签署：电子签名
- HTTPS：服务器证书验证
- 区块链：交易签名`},{question:"为什么密码不能明文存储？应该如何存储？",answer:`明文存储的危害：
- 数据库泄露后，所有用户密码暴露
- 很多用户在多个网站使用相同密码，造成连锁反应
- 违反GDPR等隐私法规

正确的密码存储方式：

1. ❌ 错误做法：
   - 明文存储
   - 仅MD5/SHA哈希（可被彩虹表破解）

2. ⚠️ 不够安全：
   - 加盐哈希：password + salt → SHA-256
   - 改进：增加了彩虹表攻击难度，但仍可暴力破解

3. ✅ 推荐做法：使用专门的密码哈希算法
   - BCrypt：自适应哈希，自动调整计算成本
   - SCrypt：内存密集型，抵抗GPU攻击
   - Argon2：最新推荐算法（2015年密码哈希竞赛获胜者）

Java示例（使用Spring Security的BCrypt）：
String hashedPassword = BCrypt.hashpw(plainPassword, BCrypt.gensalt());
boolean matches = BCrypt.checkpw(inputPassword, hashedPassword);

关键原则：
- 永远不要存储明文密码
- 使用慢哈希算法（增加暴力破解成本）
- 每个密码使用唯一的盐值
- 定期更新哈希算法（随着计算能力提升）`},{question:"HTTPS是如何保证通信安全的？",answer:`HTTPS = HTTP + SSL/TLS，通过以下步骤保证安全：

1. 握手阶段（建立安全连接）：
   a. 客户端发送支持的加密套件列表
   b. 服务器选择加密套件，返回SSL证书（包含公钥）
   c. 客户端验证证书有效性（CA签名、域名匹配、有效期）
   d. 客户端生成随机会话密钥，用服务器公钥加密后发送
   e. 服务器用私钥解密，得到会话密钥
   f. 双方确认握手完成

2. 数据传输阶段（对称加密）：
   - 使用协商好的会话密钥（AES）加密数据
   - 同时使用HMAC保证数据完整性

3. 安全保障：
   - 机密性：对称加密（AES）防止窃听
   - 完整性：HMAC防止篡改
   - 身份认证：SSL证书验证服务器身份
   - 前向保密：每次会话使用不同的密钥

4. 关键概念：
   - 非对称加密（RSA/ECC）：仅用于握手阶段交换密钥
   - 对称加密（AES）：用于实际数据传输（性能好）
   - 数字证书：由CA颁发，证明服务器身份
   - 证书链：根CA → 中间CA → 服务器证书

总结：HTTPS结合了对称加密的性能优势和非对称加密的安全性，
通过数字证书解决身份认证问题，是互联网安全的基石。`}]}),e.jsx("h2",{id:"comparison",className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"对比分析"}),e.jsx("p",{className:"text-[14px] sm:text-[15px] leading-[1.8] sm:leading-[1.9] text-ink-muted mb-4",children:"常见加密算法的综合对比："}),e.jsx("div",{className:"overflow-x-auto mb-6",children:e.jsxs("table",{className:"min-w-full divide-y divide-border border border-border rounded-paper-md",children:[e.jsx("thead",{className:"bg-parchment-deep",children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"算法"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"类型"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"密钥长度"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"速度"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"安全性"}),e.jsx("th",{className:"px-4 py-3 text-left text-xs font-medium text-ink-muted uppercase tracking-wider",children:"推荐程度"})]})}),e.jsxs("tbody",{className:"bg-white divide-y divide-border",children:[e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-mono text-sm",children:"AES-256"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"对称"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"256位"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"⚡ 快"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"✅ 高"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"⭐⭐⭐⭐⭐"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-mono text-sm",children:"AES-128"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"对称"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"128位"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"⚡ 快"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"✅ 高"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"⭐⭐⭐⭐⭐"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-mono text-sm",children:"RSA-2048"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"非对称"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"2048位"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"🐢 慢"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"✅ 高"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"⭐⭐⭐⭐"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-mono text-sm",children:"RSA-4096"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"非对称"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"4096位"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"🐢 很慢"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"✅ 很高"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"⭐⭐⭐⭐"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-mono text-sm",children:"3DES"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"对称"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"168位"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"🐢 慢"}),e.jsx("td",{className:"px-4 py-3 text-sm text-yellow-600",children:"⚠️ 中等"}),e.jsx("td",{className:"px-4 py-3 text-sm text-red-600",children:"⭐⭐"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-mono text-sm",children:"DES"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"对称"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"56位"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"⚡ 快"}),e.jsx("td",{className:"px-4 py-3 text-sm text-red-600",children:"❌ 已破解"}),e.jsx("td",{className:"px-4 py-3 text-sm text-red-600",children:"❌ 不推荐"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-mono text-sm",children:"SHA-256"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"哈希"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"-"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"⚡ 快"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"✅ 高"}),e.jsx("td",{className:"px-4 py-3 text-sm text-green-600",children:"⭐⭐⭐⭐⭐"})]}),e.jsxs("tr",{children:[e.jsx("td",{className:"px-4 py-3 font-mono text-sm",children:"MD5"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"哈希"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"-"}),e.jsx("td",{className:"px-4 py-3 text-sm",children:"⚡ 快"}),e.jsx("td",{className:"px-4 py-3 text-sm text-red-600",children:"❌ 已破解"}),e.jsx("td",{className:"px-4 py-3 text-sm text-red-600",children:"❌ 不推荐"})]})]})]})}),e.jsxs("section",{id:"related",className:"mb-8",children:[e.jsx("h2",{className:"font-display font-bold text-[20px] sm:text-display-md tracking-tight mt-8 sm:mt-12 mb-3 sm:mb-4 pb-[10px] border-b border-border-light text-ink",children:"关联知识"}),e.jsxs("div",{className:"grid grid-cols-1 sm:grid-cols-2 gap-4",children:[e.jsxs("div",{className:"p-4 border border-border rounded-paper-md hover:border-accent transition-colors",children:[e.jsx("h4",{className:"font-semibold text-sm mb-2",children:"→ 数字签名与证书"}),e.jsx("p",{className:"text-xs text-ink-muted",children:"深入学习SSL/TLS和PKI体系"})]}),e.jsxs("div",{className:"p-4 border border-border rounded-paper-md hover:border-accent transition-colors",children:[e.jsx("h4",{className:"font-semibold text-sm mb-2",children:"→ Spring Security安全框架"}),e.jsx("p",{className:"text-xs text-ink-muted",children:"学习如何在Spring应用中集成加密功能"})]})]})]}),e.jsx(d,{...a(i.category,i.id)})]})}),e.jsx(l,{items:x})]})}export{b as default};
