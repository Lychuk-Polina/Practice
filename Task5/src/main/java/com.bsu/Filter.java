import java.io.*;
import javax.servlet.*;
import javax.servlet.http.*;

public class Filter implements javax.servlet.Filter
{
    private FilterConfig config = null;
    private boolean active = false;

    public void init (FilterConfig config) throws ServletException
    {
        this.config = config;
        String act = config.getInitParameter("active");
        if (act != null)
            active = (act.toUpperCase().equals("TRUE"));
    }

    public void doFilter (ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        if (active) {
            long start = System.currentTimeMillis();
            chain.doFilter(request, response);
            long end = System.currentTimeMillis();

            HttpServletRequest req = (HttpServletRequest) request;
            String path = req.getRequestURI();
            String method = req.getMethod();

            System.out.println(String.format("%s '%s' - done (%d ms)", method, path, end - start));
        }
    }

    public void destroy()
    {
        config = null;
    }
}
