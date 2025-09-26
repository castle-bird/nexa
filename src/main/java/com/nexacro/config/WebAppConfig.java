package com.nexacro.config;

import org.springframework.context.annotation.Configuration;
import com.nexacro.uiadapter.spring.core.resolve.NexacroHandlerMethodReturnValueHandler;
import com.nexacro.uiadapter.spring.core.resolve.NexacroMethodArgumentResolver;
import com.nexacro.uiadapter.spring.core.resolve.NexacroRequestMappingHandlerAdapter;
import com.nexacro.uiadapter.spring.core.servlet.NexacroInterceptor;
import com.nexacro.uiadapter.spring.core.view.NexacroFileView;
import com.nexacro.uiadapter.spring.core.view.NexacroView;
import org.springframework.context.annotation.Bean;
import org.springframework.core.Ordered;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.HandlerMethodReturnValueHandler;
import org.springframework.web.servlet.config.annotation.*;

import java.nio.charset.StandardCharsets;
import java.util.List;

@Configuration
public class WebAppConfig implements WebMvcConfigurer {

	// 1) 루트 진입 시 Nexacro index.html 로 전달
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		// Nexacro 산출물 루트: /static/nexacro-ui/
		registry.addViewController("/").setViewName("forward:/nexacro-ui/index.html");
		registry.setOrder(Ordered.HIGHEST_PRECEDENCE);
	}

	// 2) Nexacro 정적 산출물 리소스 매핑
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		String base = "classpath:/static/nexacro-ui/";
		registry.addResourceHandler("/_resource_/**").addResourceLocations(base + "_resource_/");
		registry.addResourceHandler("/FrameBase/**").addResourceLocations(base + "FrameBase/");
		registry.addResourceHandler("/nexacrolib/**").addResourceLocations(base + "nexacrolib/");
		// 필요 시 HTML/JS 루트 접근
		registry.addResourceHandler("/*.html").addResourceLocations(base);
		registry.addResourceHandler("/*.js").addResourceLocations(base);
	}

	// 3) Nexacro Interceptor 등록 (요청 전/후 처리)
	@Bean
	public NexacroInterceptor nexacroInterceptor() {
		return new NexacroInterceptor();
	}

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
		registry.addInterceptor(nexacroInterceptor()).addPathPatterns("/api/**") // ✅ Nexacro 트랜잭션 엔드포인트만
				.excludePathPatterns("/error", "/error/**", "/_resource_/**", "/FrameBase/**", "/nexacrolib/**",
						"/**/*.html", "/**/*.js", "/**/*.css", "/**/*.png", "/**/*.jpg", "/**/*.gif")
				.order(Ordered.LOWEST_PRECEDENCE);
	}

	// 4) Nexacro View/FileView 등록
	@Bean
	public NexacroView nexacroView() {
		NexacroView view = new NexacroView();
		view.setDefaultContentType("PlatformXml"); // XML or PlatformJson 등 환경에 맞게
		view.setDefaultCharset(StandardCharsets.UTF_8.name());
		return view;
	}

	@Bean
	public NexacroFileView nexacroFileView() {
		return new NexacroFileView();
	}

	// 5) Nexacro 전용 HandlerAdapter 등록 (order=0)
	@Bean
	public NexacroRequestMappingHandlerAdapter nexacroHandlerAdapter() {
		NexacroRequestMappingHandlerAdapter adapter = new NexacroRequestMappingHandlerAdapter();
		adapter.setOrder(0); // 최우선
		adapter.setCustomArgumentResolvers(List.of(new NexacroMethodArgumentResolver()));

		NexacroHandlerMethodReturnValueHandler returnHandler = new NexacroHandlerMethodReturnValueHandler();
		returnHandler.setView(nexacroView());
		returnHandler.setFileView(nexacroFileView());
		adapter.setCustomReturnValueHandlers(List.of(returnHandler));

		return adapter;
	}

	// WebAppConfig.java
	@Override
	public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
		resolvers.add(new com.nexacro.uiadapter.spring.core.resolve.NexacroMethodArgumentResolver());
	}

	@Override
	public void addReturnValueHandlers(List<HandlerMethodReturnValueHandler> handlers) {
		var h = new com.nexacro.uiadapter.spring.core.resolve.NexacroHandlerMethodReturnValueHandler();
		h.setView(nexacroView());
		h.setFileView(nexacroFileView());
		handlers.add(0, h); // 목록 선두에 두어 우선 처리
	}

}